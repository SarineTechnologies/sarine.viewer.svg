Param(
	[Parameter(Mandatory=$true)][string]$sqlServerIp,
	[Parameter(Mandatory=$true)][string]$destDir,
	[Parameter(Mandatory=$true)][string]$iisAppName,
	[Parameter(Mandatory=$true)][string]$envName,
	[Parameter(Mandatory=$false)][string]$envId,
	[Parameter(Mandatory=$false)][string]$envType,
	[Parameter(Mandatory=$true)][string]$portNumber,
	[Parameter(Mandatory=$true)][string]$iisWebSiteName,
    [Parameter(Mandatory=$false)][string]$linuxIp,
	[Parameter(Mandatory=$true)][string]$packageName
)

#Including global variables
. "$env:ModulesPath\envConfig.ps1"


$targetPathWithoutEnvPrefix = "content/viewers/atomic/v1/js"
$sourceRelativePath = "dist"

#Create site
Write-Output "Creating s3 site..."
& "$env:ModulesPath\s3sync.ps1" -EnvName $envName -envId $envId -envType $envType -WebSiteFolder $iisAppName -targetPathWithoutEnvPrefix $targetPathWithoutEnvPrefix -maxAge 31536000 -sourceRelativePath $sourceRelativePath


Write-Output "Copy assets files to s3.."
$targetPathWithoutEnvPrefix = "content/viewers/atomic/v1/assets/svg"
$sourceRelativePath = "assets"
& "$env:ModulesPath\s3sync.ps1" -EnvName $envName -envId $envId -envType $envType -WebSiteFolder $iisAppName -targetPathWithoutEnvPrefix $targetPathWithoutEnvPrefix -maxAge 31536000 -sourceRelativePath $sourceRelativePath

if($envType -eq "prod"){
	$siteUri = "http://viewer-api.sarine.com/cache/v2/atom/sarine.viewer.svg"
}
else{
	$siteUri = "http://viewer-api-$envId.$envType.sarine.com/cache/v2/atom/sarine.viewer.svg"
}

Invoke-WebRequest -Uri  $siteUri -UseBasicParsing
Write-Output "Completed Successfully"
#Stop-Transcript
