Param(
	[Parameter(Mandatory=$true)][string]$iisAppName,
	[Parameter(Mandatory=$true)][string]$envName,
	[Parameter(Mandatory=$true)][string]$envType,
	[Parameter(Mandatory=$false)][string]$envId,
	[Parameter(Mandatory=$true)][string]$portNumber
)
. "$env:ModulesPath\envConfig.ps1"

$targetPathWithoutEnvPrefix = "content/viewers/atomic/v1/js/sarine.viewer.svg.bundle.js"

& "$env:ModulesPath\s3health.ps1" -EnvName $envName -envId $envId -envType $envType -WebSiteFolder $iisAppName -targetPathWithoutEnvPrefix $targetPathWithoutEnvPrefix
