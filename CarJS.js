function airflowActual() {
    var hp = document.getElementById('hpTarget').value;
    var af = document.getElementById('afRatio').value;
    var bsfc = document.getElementById('bsFuelConsumption').value; 
    var wa = hp * af * (bsfc/60);
    document.getElementById('airflowCalc').innerHTML = "Airflowactual: " + wa;
    return wa;
}
function mapRequired() {
    var wa = airflowActual();
    var r = 639.6;
    var tm = document.getElementById('manTemperature').value;
    var ve = document.getElementById('volEfficiency').value;
    var n = document.getElementById('engineSpeed').value;
    var vd = document.getElementById('volDisplacement').value;
    var tempSelect = document.getElementById('tempUnit').value;
    if(tempSelect == 'celsius') {
        tm = toFahrenheit(tm);
    }
    var volSelect = document.getElementById('volUnit').value;
    if(volSelect == 'cubicCentimeters') {
        vd = ccImperial(vd);
    }
    else if(volSelect == 'liters') {
        vd = literImperial(vd);
    }
    var mp = (wa * r * (460 + tm)) / (ve * (n/2) * vd)
    if(ve <= 0 || n <= 0 || vd <= 0) {
    //If this information was used... I fear what would happen. That's why it isn't shown.
        alert("Less than zero... this is impossible.");
        document.getElementById('mapReq').innerHTML = "Manifold Pressure Requirements: NaN"; 
    }
    else {
        document.getElementById('mapReq').innerHTML = "Manifold Pressure Requirements: " + mp; 
    }
}
//Garrett uses the Imperial System... 
function toFahrenheit(celsiusValue) { 
    var fahrValue = (celsiusValue * 1.8) + 32;
    return fahrValue;
}
function ccImperial(ccValue) {
    var ciValue = ccValue * 0.0610237;
    return ciValue;
}
function literImperial(literValue) {
    var ciValue = literValue * 61.0237;
    return ciValue;
}