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
. "$env:ModulesPath\global_$envType$envId.ps1"

#Get execution folder
$Invocation = (Get-Variable MyInvocation -Scope 0).Value
$executionRoot = Split-Path -parent $Invocation.MyCommand.Definition


#Include environment script if exists
$envFilePath =  ".\env-$envName$envId.ps1"

if (Test-Path $envFilePath) { 
	. "$envFilePath"
}

#Tokenizing....
Write-Output "Tokenizing config...."
$dynamicVariables= @"
__TEMPLATESERVICE__ = $templateservice
__VIEWER__ = $viewer
__REPORTFACTORYURL__ = $reportfactoryurl
__USSURL__=$ussurl
__S3URL__=$s3url
__PREVIEWSTONE__=$previewstone
__BASEPAGE__=$basepage
__CLOUDFRONT__=$cloudfront
__IDENTITYPROVIDER__=$identityprovider
"@
& "$env:ModulesPath\tokenize.ps1" -destDir "$executionRoot\..\" -dynamicVariables $dynamicVariables -fileNamePattern "*.config.js"

#Create site
Write-Output "Creating s3 site..."
& "$env:ModulesPath\s3.ps1" -EnvName $envName -envId $envId -envType $envType -WebSiteFolder $iisAppName -maxAge 31536000

Write-Output "Completed Successfully"
#Stop-Transcript
