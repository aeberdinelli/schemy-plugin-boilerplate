/**
 * A Schemy plugin is just an object with functions
 * Here you have a method for each available schemy event plus some useful things
 * If you use `this` inside the plugin methods, you have full access to the schemy instance
 * Just like this was inside its code!
 */
module.exports = {
	/**
	 * This is optional but recommended, include a name for your plugin
	 * You should use the repo name for this
	 * 
	 * @var {String}
	 */
	pluginName: 'schemy-plugin-boilerplate',

	/**
	 * This is the required Schemy version for your plugin
	 * Since we try to make the library as lightweight as possible, 
	 * you should do your own version check. There is a method below with that purpose.
	 * 
	 * @var {String}
	 */
	requiredVersion: '3.2.0',

	/**
	 * Performs a minimum version check against Schemy and throws error of fails
	 * Check the Plugin.requiredVersion property to set the required version
	 * Call it whenever you want to make sure you have the latest features available
	 * 
	 * @return {void}
	 */
	versionCheck() {
		if (!Plugin.Schemy || !Plugin.Schemy.getVersion) {
			throw new Error(
				`Schemy object is not currently available within the plugin. Check you are using schemy version ${Plugin.requiredVersion} or above`
			);
		}

		const [ major, minor ] = Plugin.Schemy.getVersion().split(/\./g).map(value => parseInt(value));
		const [ reqMajor, reqMinor ] = Plugin.requiredVersion.split(/\./g).map(value => parseInt(value));

		if (major < reqMajor || (major === reqMajor && minor < reqMinor)) {
			throw new Error(`Child Settings plugin requires schemy version ${Plugin.requiredVersion} or above`);
		}
	},

	/**
	 * This method will be invoked whenever Schemy.extend() is called 
	 * It will also receive the plugins that were passed to that method
	 *
	 * @param {Array} List of plugins
	 *
	 * @return {void}
	 */
	pluginsInitialized(plugins) {
		// This checks that extend() is being called with your plugin
		// If you have logic that prepares your plugin, you should not remove this check
		// Otherwise that logic might be called more than once
		if (!plugins.some(plugin => plugin.pluginName === Plugin.pluginName)) {
			return;
		}

		// If your plugin adds a method to schemy, this is where you should do it
		// Here you have an example
		Plugin.Schemy.myMethod = () => console.log('Hello world');

		// Now your users can do `Schemy.myMethod()`
	},

	/**
	 * This method will be called whenever a new Schemy instance is created
	 * It will receive the schema passed to the Schemy constructor
	 * 
	 * @param  {Object} Schema definition
	 * @return {void}
	 */
	beforeParse(schema) {
		// You can update the schema before schemy start using it here
		// If you uncomment the following line, schemy will not parse the schema so you need to write your own parser here
		
		//this.schemaParsed = true;
	},

	/**
	 * This is triggered after schemy finishes analyzing the schema
	 * 
	 * @param  {Object} Schema definition
	 * @return {void}
	 */
	afterParse(schema) {
		// The schema param contains the schema already parsed by Schemy
	},

	/**
	 * Invoked before Schemy attempts to validate data
	 * This is a good place to transform the input data before it is validated
	 * 
	 * @param  {Object} Data to be validated
	 * @return {void}
	 */
	beforeValidate(data) {
		// If you update data in any way, Schemy will take those changes
		// Keep in mind you have full access to the schemy instance
		// So you can use `this.validationErrors.push('some error message')` if you want to fail validation
		// In case you decide to do that, you should keep the next line
		this.validationErrors = this.validationErrors || [];
	},

	/**
	 * Invoked when Schemy finishes validating data, no matter if was success or error
	 * 
	 * @param  {Object} Validated data
	 * @return {void}
	 */
	afterValidate(data) {
		// Schemy does not uses data anymore here
		// But you can read the validation errors array within `this.validationErrors`
	},

	/**
	 * This method is called when the user calls Schemy.getValidationErrors()
	 * This is a good place to update or translate the error messages
	 * 
	 * @return {void}
	 */
	getValidationErrors() {
		// You can update `this.validationErrors` here and the user will receive the updated error messages
	}
}