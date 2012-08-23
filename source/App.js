enyo.kind({
	kind : "FittableRows",
	content : "fittableRows2",
	isContainer : true,
	name : "App",
	components : [ {
		kind : "onyx.Groupbox",
		isContainer : true,
		name : "groupbox",
		components : [ {
			kind : "onyx.GroupboxHeader",
			content : "Bill Information",
			isContainer : true,
			name : "groupboxHeader"
		}, {
			kind : "onyx.InputDecorator",
			name : "inputDecorator3",
			components : [ {
				kind : "Input",
				placeholder : "Enter subtotal ...",
				name : "input3"
			} ]
		} ]
	}, {
		kind : "onyx.Groupbox",
		isContainer : true,
		name : "groupbox2",
		components : [ {
			kind : "onyx.GroupboxHeader",
			content : "Tip information",
			isContainer : true,
			name : "groupboxHeader2"
		}, {
			kind : "FittableColumns",
			content : "fittableColumns4",
			isContainer : true,
			name : "fittableColumns4"
		}, {
			kind : "Control",
			style : "padding: 10px;",
			content : "Item",
			name : "control5"
		} ]
	}, {
		kind : "onyx.RadioGroup",
		isContainer : true,
		name : "radioGroup",
		components : [ {
			kind : "onyx.RadioButton",
			content : "EXACT",
			name : "radioButton",
			active: true
		}, {
			kind : "onyx.RadioButton",
			content : "ROUND UP",
			name : "radioButton2"
		}, {
			kind : "onyx.RadioButton",
			content : "ROUND DN",
			name : "radioButton3"
		} ]
	} ]
});