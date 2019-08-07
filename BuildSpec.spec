{
  botversion: 'v4',
  build: {
    type: 'npm',
    sourcedir: 'Source'
  },
  deploy: [{
        sourceDir: 'dist2/empty',
        configs: [{
          label: 'config',
          configsourcedir: 'dist2/environments',
          configdestname: '*',
          type: 'rename'
        }],
		destinations: [
			{
				env: 'dev', 
				directories: [ 
					'\\\\mil-crgwb-sd01\\F$\\Web\\AquariumDashboard' 
				]
			},
			{
				env: 'sit', 
				directories: [ 
					'\\\\mil-crgwb-ss01\\F$\\Web\\AquariumDashboard' 
				]
			},
			{
				env: 'uat', 
				directories: [
					'\\\\mil-crgwb-su01\\F$\\Web\\AquariumDashboard',
					'\\\\mil-crgwb-su02\\F$\\Web\\AquariumDashboard'
				]
			},
			{
				env: 'prod', 
				directories: [ 
					'\\\\mil-crgwb-sp01\\F$\\Web\\AquariumDashboard',
					'\\\\mil-crgwb-sp02\\F$\\Web\\AquariumDashboard',
					'\\\\ord-crgwb-sp01\\F$\\Web\\AquariumDashboard',
					'\\\\ord-crgwb-sp02\\F$\\Web\\AquariumDashboard' 
				]
			}
		]
	}
	]
}
