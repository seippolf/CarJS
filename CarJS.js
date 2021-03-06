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

//Garrett Turbo Stuff...
function airflowActual() {
    var hp = getNumber('hpTarget');
    var af = getNumber('afRatio');
    var bsfc = getNumber('bsFuelConsumption');
    var wa = hp * af * (bsfc/60);
    document.getElementById('airflowCalc').innerHTML = "Airflowactual: " + wa;
    return wa;
}
function mapRequired() {
    var wa = airflowActual();
    var r = 639.6;
    var tm = getNumber('manTemperature');
    var ve = getNumber('volEfficiency');
    var n = getNumber('engineSpeed');
    var vd = getNumber('volDisplacement');
    var tempSelect = getSelect('tempUnit');
    if(tempSelect == 'celsius') {
        tm = toFahrenheit(tm);
    }
    var volSelect = getSelect('volUnit');
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
        document.getElementById('mapReq').innerHTML = "Manifold Pressure Requirements: Null"; 
    }
    else {
        document.getElementById('mapReq').innerHTML = "Manifold Pressure Requirements: " + mp; 
    }
}
//Minimizing Clutter
function getNumber(elName) {
    return Number(document.getElementById(elName).value);
}
function getSelect(elName) { 
    return document.getElementById(elName).value;
}
//Unit Conversions
function toFahrenheit(elName) { 
    return ((elName * 1.8) + 32);
}
function ccImperial(elName) {
    return elName * 0.0610237;
}
function literImperial(elName) {
    return elName * 61.0237;
}
//Error Checking
function blurCheck(elName) {
    var elValue = document.getElementById(elName).value;
    if(isNaN(Number(elValue))) {
        document.getElementById(elName).style.border = "1px solid red";
    }
    else {
        document.getElementById(elName).style.border = "";
    }
}
//Dropdown Menu
function dropDown(elName) {
    document.getElementById(elName).classList.toggle("show");
}
window.onclick = function(e) {
    if(!e.target.matches('.dropbutton')) {
        var DropdownID = document.getElementById("dropdown-equations");
        if(DropdownID.classList.contains('show')) {
            DropdownID.classList.remove('show');
        }
    }
}
