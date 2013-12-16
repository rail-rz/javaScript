/**
 * @author rail_rz <zamaletdinov.rz@gmail.com>
 */

var valueOne;
var operation;

function getValue(value) {
	actionOperation(value);
}

function setValue(value) {
	document.formCal.formForCount.value += value;
}

function actionOperation(value){
	if (isFinite(value)) {
		setValue(value);
	} else if (value == '=') {
		view();
	} else if (value == 'C') {
		document.formCal.formForCount.value = null;
	} else if (value == '.') {
		if (document.formCal.formForCount.value == '') {
			setValue('0.');
		} else {
			setValue(value);
		}
	} else {
		valueOne = document.formCal.formForCount.value;
		operation = value;
		document.formCal.formForCount.value = null;
	}
}

function view() {
	var viewValue = '';
	if(operation == '+')
		viewValue = parseFloat(valueOne) + parseFloat(document.formCal.formForCount.value);
	else if( operation == '-')
		viewValue =  parseFloat(valueOne) - parseFloat(document.formCal.formForCount.value);
	else if( operation == '*')
		viewValue =  parseFloat(valueOne) * parseFloat(document.formCal.formForCount.value);
	else if( operation == '/')
		viewValue =  parseFloat(valueOne) / parseFloat(document.formCal.formForCount.value);
	document.formCal.formForCount.value = viewValue;
}

