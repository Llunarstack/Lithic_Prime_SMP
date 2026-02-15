# Script to create Mandatory and Optional mod packs

$modsPath = "C:\Users\macfa\AppData\Roaming\ModrinthApp\profiles\Modded Minecraft\mods"
$outputPath = "public\downloads"

# Optional mods (based on isOptional: true in modService.ts)
$optionalMods = @(
    "*betterf3*",
    "*capes*",
    "*continuity*",
    "*dark-loading-screen*",
    "*ferritecore*",
    "*iris*",
    "*jade*",
    "*jei*",
    "*journeymap*",
    "*krypton*",
    "*lithium*",
    "*presencefootsteps*",
    "*reeses-sodium-options*",
    "*shulkerboxtooltip*",
    "*sodium*",
    "*sound-physics-remastered*",
    "*visuality*",
    "*zoomify*",
    "*effectinsights*",
    "*fast-chest*",
    "*fastquit*",
    "*inventorymanagement*",
    "*itemswapper*",
    "*lambdabettergrass*",
    "*pickupnotifier*",
    "*skinlayers3d*",
    "*trashslot*",
    "*smoothscroll*",
    "*stfu*",
    "*subtleeffects*"
)

# Get all mod files
$allMods = Get-ChildItem -Path $modsPath -Filter "*.jar"

# Separate into mandatory and optional
$mandatoryMods = @()
$optionalModsList = @()

foreach ($mod in $allMods) {
    $isOptional = $false
    foreach ($pattern in $optionalMods) {
        if ($mod.Name -like $pattern) {
            $isOptional = $true
            break
        }
    }
    
    if ($isOptional) {
        $optionalModsList += $mod
    } else {
        $mandatoryMods += $mod
    }
}

Write-Host "Total mods: $($allMods.Count)"
Write-Host "Mandatory mods: $($mandatoryMods.Count)"
Write-Host "Optional mods: $($optionalModsList.Count)"

# Create mandatory pack
Write-Host "`nCreating Mandatory pack..."
Compress-Archive -Path $mandatoryMods.FullName -DestinationPath "$outputPath\LithicPrime-Mandatory.zip" -Force

# Create optional pack
Write-Host "Creating Optional pack..."
Compress-Archive -Path $optionalModsList.FullName -DestinationPath "$outputPath\LithicPrime-Optional.zip" -Force

Write-Host "`nDone! Created:"
Write-Host "- LithicPrime-Mandatory.zip ($($mandatoryMods.Count) mods)"
Write-Host "- LithicPrime-Optional.zip ($($optionalModsList.Count) mods)"
