jQuery.sap.declare("sap.ui.demo.Northwind.util.Controller");

sap.ui.core.mvc.Controller.extend("sap.ui.demo.Northwind.util.Contoller", {

	getEventBus: function() {
		var sComponentId = sap.ui.core.Component.getOwnerIdFor(this.getView());
		return sap.ui.component(sComponentId).getEventBus();
	},
	
	getRouter: function() {
		return sap.ui.core.UIComponent.getRouterFor(this);
	}
	
})
