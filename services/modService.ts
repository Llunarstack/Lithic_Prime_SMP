import { Mod, ModCategory } from '../types';

// The raw list provided by the user
const rawFileList = [
    "1.3.5-backpacks_mod-1.21.11.jar", "AdditionalEnchantedMiner-1.21.11-fabric-21.11.143.jar", "adorabuild-structures-2.11.0-fabric-1.21.11.jar", "advancednetherite-fabric-2.3.1-1.21.11.jar",
    "anvianslib-fabric-1.21.10-1.4.jar", "architectury-19.0.1-fabric.jar", "ArmorStatues-v21.11.1-mc1.21.11-Fabric.jar", "ArmorTrimItemFix-fabric-1.21.11-2.1.5.jar",
    "balm-fabric-1.21.11-21.11.6.jar", "BarteringStation-v21.11.0-mc1.21.11-Fabric.jar", "beautify-1.8.0+1.21.11.jar", "BigShot-fabric-1.21.11-18.0.2.jar",
    "biolith-fabric-3.5.0-beta.3.jar", "BlackwolfLibrary-fabric-1.21.11-1.1.8.jar", "bound!-2.2.4.jar", "BowInfinityFix-1.21.9-fabric-3.1.2.jar",
    "breakerplacer-fabric-1.0.6+1.21.11.jar", "bronze-fabric-2.1.5+1.21.11.jar", "bubblellaneous-3.0.1.jar", "capes-1.5.10+1.21.11-fabric.jar",
    "cardinal-components-api-7.3.0.jar", "chalk-3.1.0+1.21.10.jar", "chalk-colorful-addon-2.1.1.jar", "chunkloaders-1.2.9-fabric-mc1.21.11.jar",
    "Chunky-Fabric-1.4.55.jar", "cicada-lib-0.14.3+1.21.9-1.21.10.jar", "classicpipes-fabric-1.21.11-1.0.10.jar", "clifftree-3.1.4-1.21.11.jar",
    "ClimateRivers-v21.11.0-mc1.21.11-Fabric.jar", "cloth-config-21.11.153-fabric.jar", "collective-1.21.11-8.13.jar", "comforts-fabric-14.0.1+1.21.11.jar",
    "connectedglass-1.1.14-fabric-mc1.21.11.jar", "connectiblechains-2.5.7+1.21.11.jar", "continuity-3.0.1-beta.1+1.21.11.jar", "copper-hopper-0.20.1+1.21.11.jar",
    "Corgilib-Fabric-1.21.11-9.0.0.0.jar", "craftable-nametag-94.1.jar", "craftable-qss-2.5.jar", "CraftableTotemOfUndying-fabric-1.21.10-1.7.3.jar",
    "crawl-mc1.21.11-fabric-0.15.0.jar", "create-fly-1.21.11-6.0.9-3.jar", "CreativeCore_FABRIC_v2.14.9_mc1.21.11.jar", "cristellib-fabric-1.21.11-3.0.4.jar",
    "cryonicconfig-fabric-1.0.0+mc1.21.11.jar", "dark-loading-screen-1.6.17.jar", "datapatched-2.1.0-fabric-1.21.11.jar", "deimos-1.21.11-fabric-2.5.jar",
    "DiagonalWalls-v21.11.1-mc1.21.11-Fabric.jar", "DiagonalWindows-v21.11.1-mc1.21.11-Fabric.jar", "dungeons-and-taverns-ancient-city-overhaul-v3.2.2.jar",
    "durabilitytooltip-1.1.6-fabric-mc1.21.11.jar", "dynamic-life-standard-version-1.6.jar", "EasyMagic-v21.11.0-mc1.21.11-Fabric.jar",
    "EasyShulkerBoxes-v21.11.0-mc1.21.11-Fabric.jar", "EffectInsights-v21.11.4-mc1.21.11-Fabric.jar", "ElementalSwords-fabric-1.21.11-1.8.4.jar",
    "elytratrims-fabric-4.6.2+1.21.11.jar", "enchanted-vertical-slabs-2.6.5-fabric-mc1.21.11.jar", "EnchantingInfuser-v21.11.1-mc1.21.11-Fabric.jar",
    "enderitemod-fabric-1.21.11-1.8.1.jar", "enderscape-fabric-2.1.0+mc1.21.11.jar", "endportalrecipe-1.21.11-5.7.jar", "energizedpower-1.21.11-2.15.12-fabric.jar",
    "entity_model_features_1.21.11-fabric-3.0.11.jar", "entity_texture_features_1.21.11-fabric-7.0.8.jar", "epic-terrain_compatible-1.0.3.jar", "EternalNether-v21.11.0-mc1.21.11-Fabric.jar",
    "expanded-bow-enchantings-1.9.jar", "ExplorersCompass-1.21.11-2.2.7-fabric.jar", "extra-enchants-v1.0.0.jar", "fabric-api-0.141.3+1.21.11.jar",
    "fabric-language-kotlin-1.13.9+kotlin.2.3.10.jar", "factory_blocks-fabric-1.4.2+mc1.21.11.jar", "FarmersDelight-1.21.11-3.4.6+refabricated.jar", "fast-chest-1.6+1.21.9.jar",
    "fastquit-3.1.3+mc1.21.11.jar", "fconfiglib-1.1.1.jar", "ferritecore-8.2.0-fabric.jar", "filament-1.3.22+1.21.11.jar", "Floral Enchantment-fabric-1.21.11-1.2.1.jar",
    "ForgeConfigAPIPort-v21.11.1-mc1.21.11-Fabric.jar", "forgivingvoid-fabric-1.21.11-21.11.3.jar", "fortunate-ancient-debris-4.1.jar", "fpsoverlay-1.9.1-1.21.9.jar",
    "FrozenLib-2.3-mc1.21.11.jar", "furnacerecycle-1.21.11-2.6.jar", "fusion-1.2.12a-fabric-mc1.21.11.jar", "fzzy_config-0.7.6+1.21.11.jar", "Gamma-Utils-2.5.10+mc1.21.11.jar",
    "gardeners-dream-2.4.1.jar", "geckolib-fabric-1.21.11-5.4.3.jar", "Geophilic v3.4.6.mod.jar", "GlitchCore-fabric-1.21.11-21.11.0.2.jar", 
    "Goats tool trims.jar", "gravelminer-fabric-1.21.11-21.11.3.jar", "gravestones-1.2.10+1.21.11+A.jar", "grindstonesharpertools-1.21.11-4.0.jar",
    "HangGlider-v21.11.0-mc1.21.11-Fabric.jar", "HopperGadgetry-v21.11.0-mc1.21.11-Fabric.jar", "horse-armor-craft-v2.88.0.jar", "ImmersiveOres-1.21.11-0.1.jar",
    "Incendium_1.21.x_v5.4.10.jar", "infinitetrading-1.21.11-4.6.jar", "Infinity-Water-Bucket-Fabric-1.21.6-3.0.0.jar", "inventorymanagement-1.6.1+1.21.11.jar",
    "iris-fabric-1.10.5+mc1.21.11.jar", "itemswapper-fabric-0.8.5-mc1.21.11.jar", "Jade-1.21.11-Fabric-21.1.1.jar", "jamlib-fabric-1.3.5+1.21.11.jar", "jei-1.21.11-fabric-27.4.0.15.jar",
    "journeymap-fabric-1.21.11-6.0.0-beta.56.jar", "juju-cosmic-sword-v1.2.0+1.21.5.jar", "jumpoverfences-fabric-1.21.11-1.13.0.jar", "just-hammers-fabric-21.11.1.jar",
    "konkrete_fabric_1.9.18_MC_1.21.11.jar", "krypton-0.2.10.jar", "lambdabettergrass-2.6.0+1.21.11.jar", "LeavesBeGone-v21.11.0-mc1.21.11-Fabric.jar",
    "lithium-fabric-0.21.3+mc1.21.11.jar", "lithostitched-1.5.8+beta1-fabric-1.21.11.jar", "Loyal Items 1.0.3.jar", "magic-vibe-decorations-2.3.3-fabric-1.21.11.jar",
    "MagnumTorch-v21.11.0-mc1.21.11-Fabric.jar", "malilib-fabric-1.21.11-0.27.5.jar", "Masonry-fabric-1.21.11-0.5.5.jar", "mastercutter-1.6-mc1.21.11.jar",
    "mavapi-2.1.0+1.21.11-fabric.jar", "mavm-2.1.0+1.21.11-fabric.jar", "mcw-bridges-3.1.0-mc1.21.11fabric.jar", "mcw-doors-1.1.2-mc1.21.11fabric.jar",
    "mcw-fences-1.2.1-mc1.21.11fabric.jar", "mcw-furniture-3.4.2-mc1.21.11fabric.jar", "mcw-lights-1.1.5-mc1.21.11fabric.jar", "mcw-roofs-2.3.2-mc1.21.11fabric.jar",
    "mcw-stairs-1.0.2-mc1.21.11fabric.jar", "mcw-trapdoors-1.1.5-mc1.21.11fabric.jar", "mcw-windows-2.4.2-mc1.21.11fabric.jar", "midnightlib-fabric-1.9.2+1.21.11.jar",
    "mine-spawners-1.6.6.jar", "Mo-Glass-1.12-MC1.21.11.jar", "moarconcrete-1.6.0.jar", "modmenu-17.0.0-beta.2.jar", "MoogsEndStructures-1.21-2.0.1.jar",
    "MoogsNetherStructures-1.21-2.0.31.jar", "moogs_structure_lib-1.1.0-1.21.11-fabric.jar", "more-chest-variants-1.5.14+1.21.11-fabric.jar", "MoreDecorativeBlocks-fabric-1.21.11-1.1.4.jar",
    "morediscs-1.21.11-fabric-35.1.jar", "moreenchantments-1.3.6.jar", "moregears-2.2.0+1.21.11-fabric.jar", "MoreVillagers-Re-1.21.11-fabric-1.25.12.3.jar",
    "more_armor_trims-1.5.2-1.21.5.jar", "more_spear_enchantments-fabric-1.1.1+1.21.11.jar", "more_tools_and_armor-11.2+1.21.11.jar", "MossyLib-1.1.0+1.21.11+fabric.jar",
    "moveminecarts-1.21.11-3.8.jar", "movingelevators-1.4.11-fabric-mc1.21.11.jar", "mru-1.0.26+edge+1.21.11-fabric.jar", "naturally_trimmed-3.2.0+1.21.11-fabric.jar",
    "NaturesCompass-1.21.11-2.2.9-fabric.jar", "necropolis-ancient-city-overhaul-2.0.3.jar", "nemos-enchantments-fabric-1.21.11-1.7.3.jar", "NeoEnchant-5.13.2.jar",
    "NetherChested-v21.11.0-mc1.21.11-Fabric.jar", "NetherCoords 2.0.2 for 1.21.9-1.21.10.jar", "netherportalfix-fabric-1.21.11-21.11.2.jar", "no-telemetry-1.10.0.jar",
    "notebook-5.0.0.jar", "noxesium-fabric-3.0.0.jar", "Nullscape_1.21.x_v1.2.16.jar", "OnlyExcavators-1.21.11-0.2.jar", "OnlyHammers-1.21.11-0.1.jar", "op-gap-1.0.jar",
    "op-tools-1.8.2+1.21.11.jar", "owo-lib-0.13.0+1.21.11.jar", "packedup-1.1.0-fabric-mc1.21.11.jar", "particle_core-0.3.2+1.21.11.jar", "particular-1.21.11-Fabric-1.3.2.jar",
    "peek-fabric-1.21.11-1.4.9.jar", "PermanentSponges-v21.11.0-mc1.21.11-Fabric.jar", "persistent-parrots-1.0+1.21.9.jar", "PickUpNotifier-v21.11.0-mc1.21.11-Fabric.jar",
    "placeholder-api-2.8.2+1.21.10.jar", "PlayerAnimationLibFabric-1.1.6+mc.1.21.11.jar", "plushables-fabric-2.0.11+1.21.11.jar", "pneumonocore-1.2.1+1.21.11+A.jar",
    "polyfactory-0.10.2+1.21.11.jar", "polymer-bundled-0.15.2+1.21.11.jar", "potion-cauldron-fabric-1.0.2+mc1.21.11.jar", "powerenhancedmod-0.3.4-1.21.11.jar",
    "PresenceFootsteps-1.12.3+1.21.11.jar", "PuzzlesLib-v21.11.6-mc1.21.11-Fabric.jar", "quad-1.2.14+1.21.11-fabric.jar", "reacharound+1.21.11-1.4.2.jar",
    "real-arrow-tip-0.3.1+mc1.21.11.jar", "rechiseled-1.2.2-fabric-mc1.21.11.jar", "redstone-overpower-0.1.1-1.21.11.jar", "redstonepp-fabric-0.3.3-beta-1.21.11.jar",
    "reeses-sodium-options-fabric-2.0.3+mc1.21.11.jar", "reflex-fabric-1.0.4+mc1.21.5.jar", "ResourcefulLib-fabric-1.21.11-3.11.0.jar", "ResourcePackOverrides-v21.11.1-mc1.21.11-Fabric.jar",
    "Resourcify (1.21.11-fabric)-1.8.0.jar", "rsls-1.1.14.jar", "scalable-cats-force-fabric-3.1.8.jar", "Scribble-2.0.0-beta2+mc1.21.11-fabric.jar",
    "servercore-fabric-1.5.15+1.21.11.jar", "servux-fabric-1.21.11-0.9.1.jar", "shulkerboxtooltip-fabric-5.2.15+1.21.11.jar", "shulkerdropstwo-1.21.11-3.6.jar",
    "shut_up_gl_error-fabric-2.0.0+1.21.11.jar", "silk-all-1.11.5.jar", "SimpleCopperPipes-mc1.21.11-2.1.4.jar", "simple_snowy_fix-1.21.1-1.21.11-2.1.9-fabric.jar",
    "skinlayers3d-fabric-1.10.1-mc1.21.11.jar", "SkniroFurniture-1.4.1-1.21.11-Fabric.jar", "SkyOcean-1.12.0-1.21.11.jar", "SmelterTheHedgehog-1.2.0-1.21.4.jar",
    "smoothscroll-2.6.4.jar", "sodium-extra-fabric-0.8.3+mc1.21.11.jar", "sodium-fabric-0.8.4+mc1.21.11.jar", "sound-physics-remastered-fabric-1.21.11-1.5.1.jar",
    "sounds-2.4.22+edge+1.21.11-fabric.jar", "soundsbegone-fabric-1.4.10+mc1.21.11.jar", "spark-1.10.156-fabric.jar", "SpikySpikes-v21.11.0-mc1.21.11-Fabric.jar",
    "Stellarity-5.3.0.jar", "stendhal-1.4.5-1.21.11.jar", "Stfu-2.9.0-1.21.11.jar", "substrate-4.1+1.21.11-fabric.jar", "SubtleEffects-fabric-1.21.11-1.13.2.jar",
    "supermartijn642configlib-1.1.8-fabric-mc1.21.11.jar", "supermartijn642corelib-1.1.20-fabric-mc1.21.11.jar", "tectonic-3.0.19-fabric-1.21.11.jar",
    "TerraBlender-fabric-1.21.11-21.11.0.0.jar", "Terralith_1.21.x_v2.5.14.jar", "Terralith_Restoned_v1.3.jar", "terrestria-7.6.0-beta.2.jar", "tesseract-1.0.38-fabric-mc1.21.11.jar",
    "the-darkworld-dimension-1.1.jar", "Throwable-Spear-Fabric-1.0.0.jar", "toms_storage_fabric-1.21.11-2.7.3.jar", "ToolsOfObsidian-fabric-1.21.11-1.7.1.jar",
    "tooltrims-1.3.0+mc1.21.11-pre3.jar", "toomanypaintings-25.10.20-1.21.2-fabric.jar", "trashslot-fabric-1.21.11-21.11.4.jar", "trimmable-tools-2.1.0-fabric-1.21.11.jar",
    "true-shot-enchantment-v1.0.3.jar", "underlay-0.9.9-fabric-mc1.21.11.jar", "undermagic-ii-1.0.1.jar", "UniversalBoneMeal-v21.11.0-mc1.21.11-Fabric.jar",
    "UniversalEnchants-v21.11.2-mc1.21.11-Fabric.jar", "universal_shops-1.13.0+1.21.11.jar", "untitledduckmod-fabric-1.21.11-1.5.2.jar", "useless-reptile-0.12.3-1.21.11.jar",
    "vanilla-refresh-1.4.29.jar", "variantsandventures-fabric-1.0.22+mc1.21.11.jar", "VehicleUpgrade-v21.11.1-mc1.21.11-Fabric.jar", "veinminer-enchant-2.3.0.jar",
    "veinminer-fabric-2.5.2.jar", "VersionCheckerMod-2.5.0.jar", "Villager-API-1.21.11-fabric-1.26.1.3.jar", "visuality-0.7.12+1.21.11.jar", "vmp-fabric-mc1.21.11-0.2.0+beta.7.226-all.jar",
    "void-dimension-1.0.2.jar", "WardenSlayer-1.21.11-1.0.jar", "warping-wonders-3.4.jar", "weaponmaster_ydm-fabric-1.21.11-4.4.4.jar", "weaponsexpanded_1.21.11_1.8.1_fabric.jar",
    "WilderWild-4.2.2-mc1.21.11.jar", "worldgenfeaturefix-fabric-1.21-1.0.1.jar", "wwoo-fabric-2.6.2.jar", "yet_another_config_lib_v3-3.8.2+1.21.11-fabric.jar"
];

// Curated list of known mods for better default metadata before fetching
const knownMods: Record<string, { name?: string, description?: string, category?: ModCategory, isOptional?: boolean }> = {
    "backpacks_mod": { name: "Backpacks", description: "Adds upgradable backpacks for inventory management.", category: ModCategory.CONTENT },
    "additionalenchantedminer": { name: "Additional Enchanted Miner", description: "Advanced quarries and mining machines.", category: ModCategory.CONTENT },
    "adorabuild-structures": { name: "Adorabuild Structures", description: "Generates aesthetic structures throughout the world.", category: ModCategory.WORLD_GEN },
    "advancednetherite": { name: "Advanced Netherite", description: "Adds higher tiers of Netherite gear.", category: ModCategory.CONTENT },
    "architectury": { name: "Architectury API", description: "Intermediary API for cross-loader compatibility.", category: ModCategory.CORE },
    "armorstatues": { name: "Armor Statues", description: "Unlock full pose customization for armor stands.", category: ModCategory.DECORATION },
    "balm-fabric": { name: "Balm", description: "Shared code library for Blay's mods.", category: ModCategory.CORE },
    "barteringstation": { name: "Bartering Station", description: "Blocks that automate Piglin bartering.", category: ModCategory.CONTENT },
    "beautify": { name: "Beautify", description: "Adds hanging pots, book stacks, and blinds.", category: ModCategory.DECORATION },
    "betterf3": { name: "BetterF3", description: "Improves the debug HUD with customizable modules.", category: ModCategory.QOL, isOptional: true },
    "biolith": { name: "Biolith", description: "Biome placement library for TerraBlender.", category: ModCategory.WORLD_GEN },
    "capes": { name: "Capes", description: "Allows you to see capes from OptiFine, LabyMod, etc.", category: ModCategory.VISUAL, isOptional: true },
    "chalk": { name: "Chalk", description: "Draw markings on blocks to navigate caves.", category: ModCategory.CONTENT },
    "chunky": { name: "Chunky", description: "Pre-generates chunks to reduce server lag.", category: ModCategory.QOL },
    "cloth-config": { name: "Cloth Config", description: "Configuration screen API.", category: ModCategory.CORE },
    "comforts": { name: "Comforts", description: "Sleeping bags and hammocks for portable sleeping.", category: ModCategory.CONTENT },
    "connectedglass": { name: "Connected Glass", description: "Adds connected textures to glass blocks.", category: ModCategory.VISUAL },
    "continuity": { name: "Continuity", description: "Fabric mod for efficient connected textures.", category: ModCategory.VISUAL, isOptional: true },
    "create-fly": { name: "Create: Icarus", description: "Adds wings and flight mechanics to Create.", category: ModCategory.CONTENT },
    "dark-loading-screen": { name: "Dark Loading Screen", description: "Makes the loading screen darker.", category: ModCategory.VISUAL, isOptional: true },
    "dungeons-and-taverns": { name: "Dungeons & Taverns", description: "Adds new structures and dungeons.", category: ModCategory.WORLD_GEN },
    "easymagic": { name: "Easy Magic", description: "Enchanting tables retain inventory and more.", category: ModCategory.QOL },
    "easyshulkerboxes": { name: "Easy Shulker Boxes", description: "Interact with shulker boxes from inventory.", category: ModCategory.QOL },
    "elytratrims": { name: "Elytra Trims", description: "Allows armor trims to be applied to Elytra.", category: ModCategory.VISUAL },
    "enchantinginfuser": { name: "Enchanting Infuser", description: "Advanced enchanting table alternatives.", category: ModCategory.CONTENT },
    "explorerscompass": { name: "Explorer's Compass", description: "Locate structures anywhere in the world.", category: ModCategory.CONTENT },
    "farmersdelight": { name: "Farmer's Delight", description: "Expands farming and cooking with rich mechanics.", category: ModCategory.CONTENT },
    "ferritecore": { name: "FerriteCore", description: "Memory usage optimizations.", category: ModCategory.PERFORMANCE, isOptional: true },
    "geckolib": { name: "GeckoLib", description: "Animation engine for complex entity models.", category: ModCategory.CORE },
    "gravelminer": { name: "Gravel Miner", description: "Miners for gravel and sand.", category: ModCategory.CONTENT },
    "gravestones": { name: "Gravestones", description: "Creates a grave containing your items on death.", category: ModCategory.QOL },
    "handcrafted": { name: "Handcrafted", description: "Furniture and decoration mod.", category: ModCategory.DECORATION },
    "immersiveores": { name: "Immersive Ores", description: "Adds raw ore block variants.", category: ModCategory.VISUAL },
    "incendium": { name: "Incendium", description: "Nether overhaul with new biomes and structures.", category: ModCategory.WORLD_GEN },
    "iris": { name: "Iris Shaders", description: "Modern shaders mod compatible with Sodium.", category: ModCategory.VISUAL, isOptional: true },
    "jade": { name: "Jade", description: "Shows tooltip information for the block you're looking at.", category: ModCategory.QOL, isOptional: true },
    "jei": { name: "JEI", description: "View items and recipes.", category: ModCategory.QOL, isOptional: true },
    "journeymap": { name: "JourneyMap", description: "Real-time mapping in-game or in-browser.", category: ModCategory.QOL, isOptional: true },
    "krypton": { name: "Krypton", description: "Optimizes the Minecraft networking stack.", category: ModCategory.PERFORMANCE, isOptional: true },
    "lithium": { name: "Lithium", description: "General purpose server optimization.", category: ModCategory.PERFORMANCE, isOptional: true },
    "modmenu": { name: "Mod Menu", description: "Adds a mod list screen.", category: ModCategory.CORE },
    "naturescompass": { name: "Nature's Compass", description: "Locate biomes anywhere in the world.", category: ModCategory.CONTENT },
    "nullscape": { name: "Nullscape", description: "End dimension overhaul.", category: ModCategory.WORLD_GEN },
    "presencefootsteps": { name: "Presence Footsteps", description: "More realistic and varied footstep sounds.", category: ModCategory.VISUAL, isOptional: true },
    "reeses-sodium-options": { name: "Reese's Sodium Options", description: "Improved Sodium options menu.", category: ModCategory.QOL, isOptional: true },
    "shulkerboxtooltip": { name: "Shulker Box Tooltip", description: "View shulker box contents in tooltips.", category: ModCategory.QOL, isOptional: true },
    "sodium": { name: "Sodium", description: "Modern rendering engine for high FPS.", category: ModCategory.PERFORMANCE, isOptional: true },
    "sodium-extra": { name: "Sodium Extra", description: "Extra settings for Sodium.", category: ModCategory.QOL, isOptional: true },
    "sound-physics-remastered": { name: "Sound Physics", description: "Realistic sound attenuation and reverberation.", category: ModCategory.VISUAL, isOptional: true },
    "spark": { name: "Spark", description: "Performance profiling tool.", category: ModCategory.CORE },
    "stellarity": { name: "Stellarity", description: "Visual and gameplay overhaul for the End.", category: ModCategory.WORLD_GEN },
    "tectonic": { name: "Tectonic", description: "Massive terrain generation overhaul.", category: ModCategory.WORLD_GEN },
    "terrablender": { name: "TerraBlender", description: "Biome blending library.", category: ModCategory.WORLD_GEN },
    "terralith": { name: "Terralith", description: "Overworld generation overhaul.", category: ModCategory.WORLD_GEN },
    "toms_storage": { name: "Tom's Simple Storage", description: "Vanilla-style storage networking.", category: ModCategory.CONTENT },
    "trinkets": { name: "Trinkets", description: "Adds slots for accessories.", category: ModCategory.CONTENT },
    "visuality": { name: "Visuality", description: "Adds simple particle effects.", category: ModCategory.VISUAL, isOptional: true },
    "yacl": { name: "YACL", description: "Yet Another Config Lib.", category: ModCategory.CORE },
    "zoomify": { name: "Zoomify", description: "Zoom key implementation.", category: ModCategory.QOL, isOptional: true },
    "bronze-fabric": { name: "Bronze", description: "Adds Bronze materials and gear.", category: ModCategory.CONTENT },
    "corgilib": { name: "CorgiLib", description: "Core library for Corgi's mods.", category: ModCategory.CORE },
    "cristellib": { name: "Cristel Lib", description: "Library mod for Cristelknight's mods.", category: ModCategory.CORE },
    "diagonalwalls": { name: "Diagonal Walls", description: "Adds diagonal wall blocks.", category: ModCategory.DECORATION },
    "diagonalwindows": { name: "Diagonal Windows", description: "Adds diagonal window blocks.", category: ModCategory.DECORATION },
    "effectinsights": { name: "Effect Insights", description: "Detailed status effect information.", category: ModCategory.QOL, isOptional: true },
    "elementalswords": { name: "Elemental Swords", description: "Swords with elemental abilities.", category: ModCategory.CONTENT },
    "energizedpower": { name: "Energized Power", description: "Tech mod adding power generation and machines.", category: ModCategory.CONTENT },
    "endportalrecipe": { name: "End Portal Recipe", description: "Craftable End Portal frames.", category: ModCategory.CONTENT },
    "expanded-bow-enchantings": { name: "Expanded Bow Enchanting", description: "New enchantments for bows.", category: ModCategory.CONTENT },
    "factory_blocks": { name: "Factory Blocks", description: "Decoration blocks for factories.", category: ModCategory.DECORATION },
    "fast-chest": { name: "Fast Chest", description: "Optimizes chest rendering.", category: ModCategory.PERFORMANCE, isOptional: true },
    "fastquit": { name: "FastQuit", description: "Returns to menu immediately while world saves in background.", category: ModCategory.QOL, isOptional: true },
    "furnacerecycle": { name: "Furnace Recycle", description: "Smelt tools back into ingots.", category: ModCategory.CONTENT },
    "fusion": { name: "Fusion", description: "Connected textures library.", category: ModCategory.CORE },
    "glitchcore": { name: "GlitchCore", description: "Library mod.", category: ModCategory.CORE },
    "hoppergadgetry": { name: "Hopper Gadgetry", description: "Useful additions for hoppers.", category: ModCategory.CONTENT },
    "inventorymanagement": { name: "Inventory Management", description: "Sort and organize inventory with buttons.", category: ModCategory.QOL, isOptional: true },
    "itemswapper": { name: "Item Swapper", description: "Quickly swap items in hand.", category: ModCategory.QOL, isOptional: true },
    "just-hammers": { name: "Just Hammers", description: "Adds hammers that mine 3x3.", category: ModCategory.CONTENT },
    "lambdabettergrass": { name: "LambdaBetterGrass", description: "Better grass blocks connection.", category: ModCategory.VISUAL, isOptional: true },
    "leavesbegone": { name: "Leaves Be Gone", description: "Quick leaf decay.", category: ModCategory.QOL },
    "magic-vibe-decorations": { name: "Magic Vibe Decorations", description: "Magical decorative items.", category: ModCategory.DECORATION },
    "magnumtorch": { name: "Magnum Torch", description: "Prevents mob spawns in a large radius.", category: ModCategory.CONTENT },
    "masonry": { name: "Masonry", description: "New stone bricks and variants.", category: ModCategory.DECORATION },
    "mcw-bridges": { name: "Macaw's Bridges", description: "Variety of bridges.", category: ModCategory.DECORATION },
    "mcw-doors": { name: "Macaw's Doors", description: "Variety of doors.", category: ModCategory.DECORATION },
    "mcw-fences": { name: "Macaw's Fences", description: "Variety of fences.", category: ModCategory.DECORATION },
    "mcw-furniture": { name: "Macaw's Furniture", description: "Furniture blocks.", category: ModCategory.DECORATION },
    "mcw-lights": { name: "Macaw's Lights", description: "Lamps and lights.", category: ModCategory.DECORATION },
    "mcw-roofs": { name: "Macaw's Roofs", description: "Roofs for buildings.", category: ModCategory.DECORATION },
    "mcw-stairs": { name: "Macaw's Stairs", description: "Stairs and balconies.", category: ModCategory.DECORATION },
    "mcw-trapdoors": { name: "Macaw's Trapdoors", description: "Variety of trapdoors.", category: ModCategory.DECORATION },
    "mcw-windows": { name: "Macaw's Windows", description: "Windows and shutters.", category: ModCategory.DECORATION },
    "mine-spawners": { name: "Mine Spawners", description: "Allow mining spawners with silk touch.", category: ModCategory.CONTENT },
    "mo-glass": { name: "Mo' Glass", description: "More glass variants.", category: ModCategory.DECORATION },
    "more-chest-variants": { name: "More Chest Variants", description: "Chests made of different wood types.", category: ModCategory.DECORATION },
    "morevillagers-re": { name: "More Villagers", description: "Adds more villager jobs.", category: ModCategory.CONTENT },
    "movingelevators": { name: "Moving Elevators", description: "Realistic elevators.", category: ModCategory.CONTENT },
    "passable-foliage": { name: "Passable Foliage", description: "Walk through leaves.", category: ModCategory.QOL },
    "pickupnotifier": { name: "Pick Up Notifier", description: "Notifications when picking up items.", category: ModCategory.QOL, isOptional: true },
    "plushables": { name: "Plushables", description: "Cute plushies for decoration.", category: ModCategory.DECORATION },
    "polyfactory": { name: "PolyFactory", description: "Factory blocks using Polymer.", category: ModCategory.DECORATION },
    "potion-cauldron": { name: "Potion Cauldron", description: "Brew potions in cauldrons.", category: ModCategory.CONTENT },
    "puzzleslib": { name: "Puzzles Lib", description: "Library mod.", category: ModCategory.CORE },
    "rechiseled": { name: "Rechiseled", description: "Chisel blocks into new patterns.", category: ModCategory.DECORATION },
    "rightclickharvest": { name: "Right Click Harvest", description: "Harvest crops by right-clicking.", category: ModCategory.QOL },
    "skinlayers3d": { name: "3D Skin Layers", description: "Renders skin outer layers in 3D.", category: ModCategory.VISUAL, isOptional: true },
    "sknirofurniture": { name: "Skniro's Furniture", description: "More furniture.", category: ModCategory.DECORATION },
    "spikyspikes": { name: "Spiky Spikes", description: "Spikes for mob farms.", category: ModCategory.CONTENT },
    "trashslot": { name: "Trash Slot", description: "Adds a trash slot to the inventory.", category: ModCategory.QOL, isOptional: true },
    "universalbonemeal": { name: "Universal Bone Meal", description: "Bone meal works on more plants.", category: ModCategory.QOL },
    "universalenchants": { name: "Universal Enchants", description: "Enchantments work on more items.", category: ModCategory.CONTENT },
    "villager-api": { name: "Villager API", description: "Library for villager mods.", category: ModCategory.CORE },
    "void-dimension": { name: "Void Dimension", description: "Simple void dimension.", category: ModCategory.WORLD_GEN },
    "wardenslayer": { name: "Warden Slayer", description: "Tools to defeat the Warden.", category: ModCategory.CONTENT },
    "wwoo": { name: "William Wythers' Overhauled Overworld", description: "Biome overhaul closer to vanilla style.", category: ModCategory.WORLD_GEN },
};

// Helper to determine metadata from filename
const analyzeMod = (filename: string): Omit<Mod, 'id'> => {
    const f = filename.toLowerCase();
    
    // Improved regex to safely extract mod name while ignoring version numbers
    // 1. Remove file extension
    let name = filename.replace(/\.jar$|\.zip$/i, '');
    
    // 2. Remove common version patterns from end of string (e.g., -1.21.1, -fabric-2.3)
    // This looks for a hyphen followed by numbers/dots at the end
    name = name.replace(/-[0-9]+(\.[0-9]+)*.*$/, '');
    
    // 3. Remove "fabric" or "forge" if they appear as suffixes or prefixes
    name = name.replace(/[-_](fabric|forge)[-_]?/g, ' ');

    // 4. Remove leading version numbers (e.g. "1.3.5-backpacks" -> "backpacks")
    name = name.replace(/^[0-9]+(\.[0-9]+)*[-_]/, '');

    // 5. Clean up delimiters
    name = name.replace(/[-_]/g, ' ').trim();

    // Default values
    let description = "A useful addition to the modpack.";
    let category = ModCategory.QOL;
    let isOptional = false;

    // Check known mods first for exact matches or keys contained in filename
    for (const [key, meta] of Object.entries(knownMods)) {
        if (f.includes(key)) {
            if (meta.name) name = meta.name;
            if (meta.description) description = meta.description;
            if (meta.category) category = meta.category;
            if (meta.isOptional !== undefined) isOptional = meta.isOptional;
            return { name, description, category, isOptional, filename };
        }
    }

    // Rules engine fallbacks for unknown mods
    if (f.includes('fabric-api') || f.includes('architectury') || f.includes('lib') || f.includes('api') || f.includes('config')) {
        category = ModCategory.CORE;
        description = "Core library required for other mods to function.";
    } 
    else if (f.includes('sodium') || f.includes('lithium') || f.includes('cull') || f.includes('fps')) {
        category = ModCategory.PERFORMANCE;
        description = "Optimizes game performance and FPS.";
        isOptional = true; 
    }
    else if (f.includes('iris') || f.includes('shader') || f.includes('visual') || f.includes('camera')) {
        category = ModCategory.VISUAL;
        description = "Enhances visuals, shaders, or audio.";
        isOptional = true;
    }
    else if (f.includes('biome') || f.includes('gen') || f.includes('structure')) {
        category = ModCategory.WORLD_GEN;
        description = "Adds new biomes, terrain generation, or structures.";
    }
    else if (f.includes('furni') || f.includes('decor') || f.includes('block')) {
        category = ModCategory.DECORATION;
        description = "New blocks and items for building and decoration.";
    }
    else if (f.includes('enchant') || f.includes('tool') || f.includes('armor') || f.includes('weapon')) {
        category = ModCategory.CONTENT;
        description = "Gameplay features, combat, or tools.";
    }

    // Final capitalization
    if (!Object.values(knownMods).some(m => m.name === name)) {
        name = name.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
    }
    
    // Safety check for empty name
    if (!name || name.trim() === '') {
        name = filename; // Fallback to raw filename if parsing fails completely
    }

    return { name, description, category, isOptional, filename };
};

export const getAllMods = (): Mod[] => {
    return rawFileList.map((filename, index) => ({
        id: `mod-${index}`,
        ...analyzeMod(filename)
    })).sort((a, b) => {
        // Sort: Core first, then Alphabetical
        if(a.category === ModCategory.CORE && b.category !== ModCategory.CORE) return -1;
        if(b.category === ModCategory.CORE && a.category !== ModCategory.CORE) return 1;
        return a.name.localeCompare(b.name);
    });
};
