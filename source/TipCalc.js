enyo.kind({
	kind : "FittableRows",
	content : "fittableRows2",
	isContainer : true,
	name : "TipCalc",
	components : [
	{kind: "onyx.Groupbox", isContainer: true, name: "groupbox", components: [
			{kind: "onyx.GroupboxHeader", content: "Bill Information", isContainer: true, name: "groupboxHeader"},
			{kind: "onyx.InputDecorator", name: "inputDecorator3", components: [
					{kind: "onyx.Input", placeholder: "Enter subtotal ...", name: "subtotal", onchange: "subtotalChanged"}
				]}
		]},
	{kind: "onyx.Groupbox", style: "margin-top: 10px", isContainer: true, name: "groupbox2", components: [
			{kind: "onyx.GroupboxHeader", content: "Tip information", isContainer: true, name: "groupboxHeader2"},
			{kind: "FittableColumns", content: "fittableColumns4", isContainer: true, name: "fittableColumns4", components: [
					{kind: "FittableColumns", style: "width: 50%", name: "fittableColumns3", components: [
							{kind: "Control", style: "padding: 10px;", content: "TIP %", fit: true, name: "percent"},
							{kind: "onyx.PickerDecorator", name: "pickerDecorator", components: [
									{kind: "onyx.PickerButton", name: "pickerButton"},
									{kind: "onyx.Picker", canGenerate: false, name: "percentPicker", components: [
											{kind: "onyx.MenuItem", content: "0", name: "menuItem"},
											{kind: "onyx.MenuItem", content: "10", name: "menuItem2"},
											{kind: "onyx.MenuItem", content: "15", name: "menuItem3"},
											{kind: "onyx.MenuItem", content: "20", name: "menuItem4"},
											{kind: "onyx.MenuItem", content: "25", name: "menuItem5"}
										], onChange: "percentChanged"}
								]}
						]},
					{kind: "FittableColumns", style: "width: 50%", name: "fittableColumns5", components: [
							{kind: "Control", style: "padding: 10px;", content: "Split#", fit: true, name: "split"},
							{kind: "onyx.PickerDecorator", name: "pickerDecorator2", components: [
									{kind: "onyx.PickerButton", content: "1", name: "pickerButton2"},
									{kind: "onyx.Picker", canGenerate: false, name: "splitPicker", components: [
											{kind: "onyx.MenuItem", content: "1", name: "menuItem6"},
											{kind: "onyx.MenuItem", content: "2", name: "menuItem7"},
											{kind: "onyx.MenuItem", content: "3", name: "menuItem8"},
											{kind: "onyx.MenuItem", content: "4", name: "menuItem9"},
											{kind: "onyx.MenuItem", content: "5", name: "menuItem10"}
										], onChange: "splitChanged"}
								]}
						]}
				]},
			{kind: "FittableColumns", content: "fittableColumns", isContainer: true, name: "fittableColumns", components: [
					{kind: "Control", style: "padding: 10px;", content: "Tip amount", fit: true, name: "control"},
					{kind: "Control", style: "padding: 10px;", content: "0.00", name: "tip"}
				]},
			{kind: "FittableColumns", content: "fittableColumns2", isContainer: true, name: "fittableColumns2", components: [
					{kind: "Control", style: "padding: 10px;", content: "Total amount", fit: true, name: "control2"},
					{kind: "Control", style: "padding: 10px;", content: "0.00", name: "total"}
				]}
		]},
	{kind: "onyx.RadioGroup", style: "margin-top: 10px", fit: true, isContainer: true, name: "radioGroup", components: [
			{kind: "onyx.RadioButton", style: "width: 30%; height: 60px", content: "EXACT", name: "radioButton"},
			{kind: "onyx.RadioButton", style: "width: 30%; height: 60px", content: "ROUND UP", name: "radioButton2", active: true},
			{kind: "onyx.RadioButton", style: "width: 30%; height: 60px", content: "ROUND DN", name: "radioButton3"}
		], onActivate: "modeChanged"}
],
	subtotal: 0,
	digits: 2,
	subtotalChanged: function() {
		this.subtotal = parseFloat(this.$.subtotal.getValue());
		if (isNaN(this.subtotal)) {
			enyo.log("subtotal NaN");
			this.subtotal = 0;
		}
		this.subtotal = this.subtotal.toFixed(this.digits);
		enyo.log("Subtotal: " + this.$.subtotal.getValue() + " --> " + this.subtotal);
		this.$.subtotal.setValue(this.subtotal);
		this.compute();
	},
	modeChanged: function(inSender, inEvent) {
		if (inEvent.originator.getActive()) {
			enyo.log("New mode: " + inEvent.originator.getContent());
			this.mode = inEvent.originator.getContent();
		}
		this.compute();
	},
	splitChanged: function(inSender, inEvent) {
		enyo.log("splitChanged: " + inEvent.content);
		this.split = inEvent.content;
		this.compute();
	},
	percentChanged: function(inSender, inEvent) {
		enyo.log("percentChanged: " + inEvent.content);
		this.percent = inEvent.content;
		this.compute();
	},
	compute: function() {
		var subtotal = parseFloat(this.subtotal);
		var tip = subtotal * this.percent / 100;
		var total = subtotal + tip;
		enyo.log("Computed tip: " + tip + " computed total: " + total);
		this.$.tip.setContent(tip.toFixed(this.digits));
		this.$.total.setContent(total.toFixed(this.digits));
	}
});