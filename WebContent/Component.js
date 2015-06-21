jQuery.sap.declare("sap.ui.demo.Northwind");
jQuery.sap.require("sap.ui.demo.Northwind.MyRouter");

sap.ui.core.UIComponent("sap.ui.demo.Northwind", {
	
	// metadata: settings configuration
	
	metadata: {
		name: "Northwind demo App",
		version: "1.0",
		includes: [],
		dependencies: {
			libs: ["sap.m", "sap.ui.layout"],
			components: []
		},
		rootView: "sap.ui.demo.Northwind.App",
		
		config: {
			resourceBundle: "i18n/messageBundle.properties",
			serviceConfig: {
				name: "Northwind",
				serviceUrl: "http://services.odata.org/V2/(S(sapuidemotdg))/OData/OData.svc/"
			}
		},
		
		routing: {
			config: {
				routerClass: sap.ui.demo.Northwind.MyRouter,
				viewType: "XML",
				viewPath: "sap.ui.demo.Northwind.view",
				targetAggregation: "detailPages",
				clearTarget: false
			},
			routes: [
			         {
			        	 pattern: "",
			        	 name: "main",
			        	 view: "Master",
			        	 targetAggregation: "masterPages",
			        	 targetControl: "idAppControl",
			        	 subroutes : [ {
			        		 pattern: "{product}/:tab",
			        		 name: "product",
			        		 view: "Detail"
			        	 } ]
			         },
			         {
			        	 name: "catchallMaster",
			        	 view: "Master",
			        	 targetAggregation: "masterPages",
			        	 targetControl: "idAppControl",
			        	 subroutes: [ {
			        		 pattern: ":all*:",
			        		 name: "catchallDetail",
			        		 view: "NotFound"
			        	 } ]
			         }
			         
			         ]
		}
	},
	
	init: function() {
		
		// WTF ?!
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
		
		// get configuration
		var mConfig = this.getMetadata().getConfig();
		
		// get root path (always use absolute !)
		var rootPath = jQuery.sap.getModulePath("sap.ui.demo.Northwind");
		
		// set i18n model
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl: [rootPath, mConfig.resourceBundle].join('/')
		});
		this.setModel(i18nModel, "i18n");
		
		// set oData model
		var sServiceUrl = mConfig.serviceConfig.serviceUrl;
		var oData = new sap.ui.model.odata.oDataModel(sServiceUrl, true);
		this.setModel(oData);
		
		// set device model
		var deviceModel = new sap.ui.model.json.JSONModel({
			isTouch: sap.ui.Device.support.touch,
			isNoTouch: !sap.ui.Device.support.touch,
			isPhone: sap.ui.Device.system.phone,
			isNoPhone: !sap.ui.Device.system.phone,
			listMode: sap.ui.Device.system.phone ? "None" : "SingleSelectMaster",
			listItemType: sap.ui.Device.system.phone ? "Active" : "Inactive"
		});
		deviceModel.setDefaultBindingMode("OneWay");
		this.setModel(deviceModel, "device");
		
		// prepare router
		this.getRouter().initialize();
		
	}
	
	
	
})