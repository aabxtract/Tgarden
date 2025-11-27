// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title TemporalGarden
 * @dev A living digital plant NFT that evolves based on wallet on-chain activity
 */
contract TemporalGarden is ERC721, Ownable {
    using Strings for uint256;
    
    // Plant growth stages
    enum GrowthStage { Seed, Sprout, Sapling, Mature, Blooming, Fruiting }
    
    // Plant species types
    enum PlantSpecies { 
        Sakura,      // Cherry Blossom
        Willow,      // Weeping Willow
        Lotus,       // Water Lotus
        Bamboo,      // Lucky Bamboo
        Fern,        // Ethereal Fern
        Wisteria     // Hanging Wisteria
    }
    
    // Plant vitality states
    enum VitalityState { Vibrant, Healthy, Neutral, Drooping, Wilting }
    
    // Plant data structure
    struct Plant {
        PlantSpecies species;
        GrowthStage stage;
        VitalityState vitality;
        uint256 growthPoints;
        uint256 lastActivityTimestamp;
        uint256 birthTimestamp;
        uint256 totalActivities;
        string colorPalette; // hex color scheme
        uint256 customizationLevel;
    }
    
    // Activity log entry
    struct ActivityLog {
        uint256 timestamp;
        string activityType; // "transfer", "swap", "stake", etc.
        uint256 growthAwarded;
    }
    
    // Storage
    mapping(address => uint256) public walletToPlant;
    mapping(uint256 => Plant) public plants;
    mapping(uint256 => ActivityLog[]) public plantActivityLogs;
    
    uint256 private _nextTokenId;
    uint256 public constant ACTIVITY_DECAY_TIME = 7 days;
    uint256 public constant WILTING_THRESHOLD = 14 days;
    
    // Growth point thresholds for stages
    uint256[6] public stageThresholds = [0, 100, 300, 700, 1500, 3000];
    
    // Events
    event PlantBorn(address indexed owner, uint256 indexed tokenId, PlantSpecies species);
    event PlantGrew(uint256 indexed tokenId, GrowthStage newStage, uint256 growthPoints);
    event ActivityRecorded(uint256 indexed tokenId, string activityType, uint256 growthAwarded);
    event PlantCustomized(uint256 indexed tokenId, PlantSpecies newSpecies, string colorPalette);
    event VitalityChanged(uint256 indexed tokenId, VitalityState newVitality);
    
    constructor() ERC721("Temporal Garden", "TGARDEN") Ownable(msg.sender) {}
    
    /**
     * @dev Mint a new plant for a wallet (one per wallet)
     */
    function mintPlant() public {
        require(walletToPlant[msg.sender] == 0, "Wallet already has a plant");
        
        _nextTokenId++;
        uint256 tokenId = _nextTokenId;
        
        _safeMint(msg.sender, tokenId);
        walletToPlant[msg.sender] = tokenId;
        
        // Initialize plant with default values
        plants[tokenId] = Plant({
            species: PlantSpecies.Sakura,
            stage: GrowthStage.Seed,
            vitality: VitalityState.Vibrant,
            growthPoints: 0,
            lastActivityTimestamp: block.timestamp,
            birthTimestamp: block.timestamp,
            totalActivities: 0,
            colorPalette: "sage,celadon,lavender",
            customizationLevel: 0
        });
        
        emit PlantBorn(msg.sender, tokenId, PlantSpecies.Sakura);
    }
    
    /**
     * @dev Record on-chain activity and award growth points
     */
    function recordActivity(address wallet, string memory activityType) external {
        uint256 tokenId = walletToPlant[wallet];
        require(tokenId != 0, "Wallet has no plant");
        require(ownerOf(tokenId) == wallet, "Not plant owner");
        
        Plant storage plant = plants[tokenId];
        
        // Calculate growth points based on activity type
        uint256 growthAwarded = calculateGrowthPoints(activityType);
        
        // Update plant data
        plant.growthPoints += growthAwarded;
        plant.lastActivityTimestamp = block.timestamp;
        plant.totalActivities++;
        
        // Update vitality based on activity
        updateVitality(tokenId);
        
        // Check for stage progression
        GrowthStage newStage = determineGrowthStage(plant.growthPoints);
        if (newStage != plant.stage) {
            plant.stage = newStage;
            emit PlantGrew(tokenId, newStage, plant.growthPoints);
        }
        
        // Log the activity
        plantActivityLogs[tokenId].push(ActivityLog({
            timestamp: block.timestamp,
            activityType: activityType,
            growthAwarded: growthAwarded
        }));
        
        emit ActivityRecorded(tokenId, activityType, growthAwarded);
    }
    
    /**
     * @dev Calculate growth points for activity type
     */
    function calculateGrowthPoints(string memory activityType) internal pure returns (uint256) {
        bytes32 activityHash = keccak256(abi.encodePacked(activityType));
        
        if (activityHash == keccak256("transfer")) return 10;
        if (activityHash == keccak256("swap")) return 15;
        if (activityHash == keccak256("stake")) return 25;
        if (activityHash == keccak256("mint")) return 20;
        if (activityHash == keccak256("bridge")) return 30;
        if (activityHash == keccak256("vote")) return 20;
        
        return 5; // Default for unknown activities
    }
    
    /**
     * @dev Determine growth stage based on points
     */
    function determineGrowthStage(uint256 growthPoints) internal view returns (GrowthStage) {
        if (growthPoints >= stageThresholds[5]) return GrowthStage.Fruiting;
        if (growthPoints >= stageThresholds[4]) return GrowthStage.Blooming;
        if (growthPoints >= stageThresholds[3]) return GrowthStage.Mature;
        if (growthPoints >= stageThresholds[2]) return GrowthStage.Sapling;
        if (growthPoints >= stageThresholds[1]) return GrowthStage.Sprout;
        return GrowthStage.Seed;
    }
    
    /**
     * @dev Update plant vitality based on time since last activity
     */
    function updateVitality(uint256 tokenId) internal {
        Plant storage plant = plants[tokenId];
        uint256 timeSinceActivity = block.timestamp - plant.lastActivityTimestamp;
        
        VitalityState oldVitality = plant.vitality;
        VitalityState newVitality;
        
        if (timeSinceActivity < 1 days) {
            newVitality = VitalityState.Vibrant;
        } else if (timeSinceActivity < 3 days) {
            newVitality = VitalityState.Healthy;
        } else if (timeSinceActivity < ACTIVITY_DECAY_TIME) {
            newVitality = VitalityState.Neutral;
        } else if (timeSinceActivity < WILTING_THRESHOLD) {
            newVitality = VitalityState.Drooping;
        } else {
            newVitality = VitalityState.Wilting;
        }
        
        if (newVitality != oldVitality) {
            plant.vitality = newVitality;
            emit VitalityChanged(tokenId, newVitality);
        }
    }
    
    /**
     * @dev Get current vitality without updating state
     */
    function getCurrentVitality(uint256 tokenId) public view returns (VitalityState) {
        Plant memory plant = plants[tokenId];
        uint256 timeSinceActivity = block.timestamp - plant.lastActivityTimestamp;
        
        if (timeSinceActivity < 1 days) return VitalityState.Vibrant;
        if (timeSinceActivity < 3 days) return VitalityState.Healthy;
        if (timeSinceActivity < ACTIVITY_DECAY_TIME) return VitalityState.Neutral;
        if (timeSinceActivity < WILTING_THRESHOLD) return VitalityState.Drooping;
        return VitalityState.Wilting;
    }
    
    /**
     * @dev Customize plant species (costs growth points)
     */
    function customizePlantSpecies(uint256 tokenId, PlantSpecies newSpecies) public {
        require(ownerOf(tokenId) == msg.sender, "Not plant owner");
        
        Plant storage plant = plants[tokenId];
        uint256 cost = 500 * (plant.customizationLevel + 1);
        
        require(plant.growthPoints >= cost, "Insufficient growth points");
        
        plant.species = newSpecies;
        plant.growthPoints -= cost;
        plant.customizationLevel++;
        
        emit PlantCustomized(tokenId, newSpecies, plant.colorPalette);
    }
    
    /**
     * @dev Customize plant color palette (costs growth points)
     */
    function customizePlantColors(uint256 tokenId, string memory newColorPalette) public {
        require(ownerOf(tokenId) == msg.sender, "Not plant owner");
        
        Plant storage plant = plants[tokenId];
        uint256 cost = 300 * (plant.customizationLevel + 1);
        
        require(plant.growthPoints >= cost, "Insufficient growth points");
        
        plant.colorPalette = newColorPalette;
        plant.growthPoints -= cost;
        plant.customizationLevel++;
        
        emit PlantCustomized(tokenId, plant.species, newColorPalette);
    }
    
    /**
     * @dev Get plant data
     */
    function getPlant(uint256 tokenId) public view returns (Plant memory) {
        return plants[tokenId];
    }
    
    /**
     * @dev Get activity log for a plant
     */
    function getActivityLog(uint256 tokenId, uint256 offset, uint256 limit) 
        public 
        view 
        returns (ActivityLog[] memory) 
    {
        ActivityLog[] storage logs = plantActivityLogs[tokenId];
        uint256 total = logs.length;
        
        if (offset >= total) {
            return new ActivityLog[](0);
        }
        
        uint256 end = offset + limit;
        if (end > total) {
            end = total;
        }
        
        ActivityLog[] memory result = new ActivityLog[](end - offset);
        for (uint256 i = offset; i < end; i++) {
            result[i - offset] = logs[i];
        }
        
        return result;
    }
    
    /**
     * @dev Get plant age in days
     */
    function getPlantAge(uint256 tokenId) public view returns (uint256) {
        return (block.timestamp - plants[tokenId].birthTimestamp) / 1 days;
    }
    
    /**
     * @dev Get days since last activity
     */
    function getDaysSinceActivity(uint256 tokenId) public view returns (uint256) {
        return (block.timestamp - plants[tokenId].lastActivityTimestamp) / 1 days;
    }
    
    /**
     * @dev Generate on-chain SVG metadata
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        
        Plant memory plant = plants[tokenId];
        VitalityState currentVitality = getCurrentVitality(tokenId);
        
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "Temporal Garden Plant #',
                        tokenId.toString(),
                        '", "description": "A living digital plant that grows with your on-chain activity", "attributes": [',
                        '{"trait_type": "Species", "value": "',
                        getSpeciesName(plant.species),
                        '"},',
                        '{"trait_type": "Growth Stage", "value": "',
                        getStageName(plant.stage),
                        '"},',
                        '{"trait_type": "Vitality", "value": "',
                        getVitalityName(currentVitality),
                        '"},',
                        '{"trait_type": "Growth Points", "value": ',
                        plant.growthPoints.toString(),
                        '},',
                        '{"trait_type": "Age (days)", "value": ',
                        getPlantAge(tokenId).toString(),
                        '},',
                        '{"trait_type": "Total Activities", "value": ',
                        plant.totalActivities.toString(),
                        '}',
                        ']}'
                    )
                )
            )
        );
        
        return string(abi.encodePacked("data:application/json;base64,", json));
    }
    
    // Helper functions for metadata
    function getSpeciesName(PlantSpecies species) internal pure returns (string memory) {
        if (species == PlantSpecies.Sakura) return "Sakura";
        if (species == PlantSpecies.Willow) return "Willow";
        if (species == PlantSpecies.Lotus) return "Lotus";
        if (species == PlantSpecies.Bamboo) return "Bamboo";
        if (species == PlantSpecies.Fern) return "Fern";
        if (species == PlantSpecies.Wisteria) return "Wisteria";
        return "Unknown";
    }
    
    function getStageName(GrowthStage stage) internal pure returns (string memory) {
        if (stage == GrowthStage.Seed) return "Seed";
        if (stage == GrowthStage.Sprout) return "Sprout";
        if (stage == GrowthStage.Sapling) return "Sapling";
        if (stage == GrowthStage.Mature) return "Mature";
        if (stage == GrowthStage.Blooming) return "Blooming";
        if (stage == GrowthStage.Fruiting) return "Fruiting";
        return "Unknown";
    }
    
    function getVitalityName(VitalityState vitality) internal pure returns (string memory) {
        if (vitality == VitalityState.Vibrant) return "Vibrant";
        if (vitality == VitalityState.Healthy) return "Healthy";
        if (vitality == VitalityState.Neutral) return "Neutral";
        if (vitality == VitalityState.Drooping) return "Drooping";
        if (vitality == VitalityState.Wilting) return "Wilting";
        return "Unknown";
    }
    
    /**
     * @dev Override transfer to prevent plant trading (soul-bound to wallet activity)
     */
    function _update(address to, uint256 tokenId, address auth) 
        internal 
        virtual 
        override 
        returns (address) 
    {
        address from = _ownerOf(tokenId);
        
        // Allow minting and burning, but not transfers
        if (from != address(0) && to != address(0)) {
            revert("Plants are soul-bound to their wallet");
        }
        
        return super._update(to, tokenId, auth);
    }
}