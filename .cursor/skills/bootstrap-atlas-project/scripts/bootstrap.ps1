# Bootstrap Atlas Project
# Usage: .\bootstrap.ps1 -SourcePath "C:\Progetti\Atlas OS" -TargetPath "C:\Projects\NewApp"
# Never overwrites existing files. Creates directories as needed.

param(
    [Parameter(Mandatory=$true)][string]$SourcePath,
    [Parameter(Mandatory=$true)][string]$TargetPath
)

$ErrorActionPreference = "Stop"
$created = @()
$skipped = @()

function Ensure-Dir { param([string]$p)
    if (-not (Test-Path $p)) { New-Item -ItemType Directory -Path $p -Force | Out-Null; $true } else { $false }
}

function Copy-IfMissing { param([string]$src, [string]$dst)
    if (Test-Path $src) {
        if (-not (Test-Path $dst)) {
            $dstDir = Split-Path $dst -Parent
            if (-not (Test-Path $dstDir)) { New-Item -ItemType Directory -Path $dstDir -Force | Out-Null }
            Copy-Item -Path $src -Destination $dst -Force
            $script:created += $dst.Replace($TargetPath, ".").TrimStart("\")
        } else { $script:skipped += $dst.Replace($TargetPath, ".").TrimStart("\") }
    }
}

$src = $SourcePath.TrimEnd("\")
$tgt = $TargetPath.TrimEnd("\")

# Create structure
@(
    "$tgt\.cursor\rules\core", "$tgt\.cursor\rules\project",
    "$tgt\.cursor\agents", "$tgt\.cursor\skills",
    "$tgt\docs\ai"
) | ForEach-Object { Ensure-Dir $_ | Out-Null }

# Core rules (include 04-autonomous-execution — required since Atlas v0.1.8 / foundry foundation)
@("00-global-operating-principles", "01-documentation-system", "02-branching-and-commit-policy",
  "03-platform-agnostic-standards", "04-security-baseline", "04-autonomous-execution",
  "05-testing-and-definition-of-done", "06-minimal-change-ponytail",
  "07-structured-delivery-superpowers") | ForEach-Object {
    Copy-IfMissing "$src\.cursor\rules\core\$_.mdc" "$tgt\.cursor\rules\core\$_.mdc"
}
# Project rules
@("10-project-architecture", "11-page-documentation-policy", "12-domain-and-business-rules", "13-release-and-deploy-notes") | ForEach-Object {
    Copy-IfMissing "$src\.cursor\rules\project\$_.mdc" "$tgt\.cursor\rules\project\$_.mdc"
}
# Agents
Get-ChildItem "$src\.cursor\agents\*.md" -ErrorAction SilentlyContinue | ForEach-Object {
    Copy-IfMissing $_.FullName "$tgt\.cursor\agents\$($_.Name)"
}
# Skills (entire folder: SKILL.md, scripts/, etc.)
Get-ChildItem "$src\.cursor\skills\*" -Directory -ErrorAction SilentlyContinue | ForEach-Object {
    $skillName = $_.Name
    $skillRoot = $_.FullName
    Get-ChildItem $skillRoot -Recurse -File -ErrorAction SilentlyContinue | ForEach-Object {
        $rel = $_.FullName.Substring($skillRoot.Length).TrimStart("\")
        Copy-IfMissing $_.FullName "$tgt\.cursor\skills\$skillName\$rel"
    }
}
# docs/ai
@("ARCHITECTURE", "PROJECT_RULES", "PAGE_DOCS", "DECISIONS", "CHANGELOG_AI", "AGENT_IMPROVEMENTS") | ForEach-Object {
    Copy-IfMissing "$src\docs\ai\$_.md" "$tgt\docs\ai\$_.md"
}

# Version bump on commit
Ensure-Dir "$tgt\scripts" | Out-Null
Copy-IfMissing "$src\VERSION" "$tgt\VERSION"
Copy-IfMissing "$src\scripts\bump-version.sh" "$tgt\scripts\bump-version.sh"
Ensure-Dir "$tgt\.githooks" | Out-Null
Copy-IfMissing "$src\.githooks\pre-commit" "$tgt\.githooks\pre-commit"
Copy-IfMissing "$src\.githooks\prepare-commit-msg" "$tgt\.githooks\prepare-commit-msg"

Write-Host "`n## Bootstrap Summary`n"
Write-Host "**Target:** $tgt"
Write-Host "**Source:** $src`n"
Write-Host "### Created ($($created.Count))"
$created | ForEach-Object { Write-Host "  - $_" }
Write-Host "`n### Skipped ($($skipped.Count))"
$skipped | ForEach-Object { Write-Host "  - $_" }
