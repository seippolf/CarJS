  /*
    Sources:
        https://www.turbobygarrett.com/turbobygarrett/choosing_turbo
    
    
    Wa = HP * (A/F) * (BSFC/60)
    
        Wa: Airflowactual
        HP: Horsepower Target (flywheel)
        A/F: Air/Fuel Ratio
        BSFC/60: Brake Specific Fuel Consumption per hour --> per minute 
            ^This is measured on a dynamometer
    
    MAPreq = (Wa * R * (460 + Tm)) / (VE * (N/2) * Vd)
    
        MAPreq: Manifold Absolute Pressure required to reach Horsepower target
        Wa: Airflowactual
        R = Gas Constant = 639.6
        Tm = Intake Manifold Temperature (degrees F)
        VE = Volumetric Efficiency
        N = Engine Speed (RPM)
        Vd = Volumetric displacement (In Cubic Inches)
    
    */

    //PSIA BUG 
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