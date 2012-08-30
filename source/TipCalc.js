enyo.kind({
	kind : "FittableRows",
	content : "fittableRows2",
	isContainer : true,
	name : "TipCalc",
	components : [
		{kind : "onyx.Groupbox", isContainer : true, name : "groupbox", components : [
			{kind : "onyx.GroupboxHeader", content : "Bill Information", isContainer : true, name : "groupboxHeader"},
			{kind : "onyx.InputDecorator", name : "inputDecorator3", components : [
				{kind : "onyx.Input", defaultFocus: true, placeholder : "Enter subtotal ...", name : "subtotal", onchange: "subtotalChanged"}
				]
			} ]
		},
		{kind : "onyx.Groupbox", isContainer : true, name : "groupbox2", components : [
			{kind : "onyx.GroupboxHeader", content : "Tip information", isContainer : true, name : "groupboxHeader2"},
			{kind : "FittableColumns", content : "fittableColumns4", isContainer : true, name : "fittableColumns4", components: [
					{kind : "Control", content: "TIP %", style : "padding: 10px;", name : "percent"},
					{kind: "onyx.PickerDecorator", components: [
						{}, //this uses the defaultKind property of PickerDecorator to inherit from PickerButton
						{kind: "onyx.Picker", onChange: "percentChanged", name: "percentPicker", components: [
							{content: "0"},
							{content: "10"},
							{content: "15", active: true},
							{content: "20"},
							{content: "25"}
							]}
						]},	
					{kind : "Control", content: "Split#", style : "padding: 10px;", name : "split"},
					{kind: "onyx.PickerDecorator", components: [
						{}, //this uses the defaultKind property of PickerDecorator to inherit from PickerButton
						{kind: "onyx.Picker", onChange: "splitChanged", name: "splitPicker", components: [
							{content: "1", active: true},
							{content: "2"},
							{content: "3"},
							{content: "4"},
							{content: "5"}
							]}
						]}
				]},
			{kind : "Control", content: "Tip amount", style : "padding: 10px;"},
			{kind : "Control", content: "0.00", style : "padding: 10px;", name : "tip"},
			{kind : "Control", content: "Total amount", style : "padding: 10px;"},
			{kind : "Control", content: "0.00", style : "padding: 10px;", name : "total"}
			]
		},
		{kind : "onyx.RadioGroup", isContainer : true, name : "radioGroup", onActivate: "modeChanged", components : [
			{kind : "onyx.RadioButton", style: "width: 30%; height: 60px", content : "EXACT", name : "radioButton", active: true},
			{kind : "onyx.RadioButton", style: "width: 30%; height: 60px", content : "ROUND UP", name : "radioButton2"},
			{kind : "onyx.RadioButton", style: "width: 30%; height: 60px", content : "ROUND DN", name : "radioButton3"}
			]
		}
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