import {Injectable} from "@angular/core";
import {Http} from "@angular/http"

@Injectable()
export class MicrocontrollerDataService{

  constructor(private http: Http) {}


  prepareMicrocontrollerData () {
    return {
      "model_name":this.microcontrollerBasicData[this.microcontrollerBasicData.length-1].microcontrollerModelName,
      "display_name":this.microcontrollerBasicData[this.microcontrollerBasicData.length-1].microcontrollerDisplayName,
      "description":this.microcontrollerBasicData[this.microcontrollerBasicData.length-1].microcontrollerDescription,
      "code_structure_path_to_xml":"",
      "avarage_operating_current":this.microcontrollerBasicData[this.microcontrollerBasicData.length-1].averageOperatingCurrent,
      "voltage":this.microcontrollerBasicData[this.microcontrollerBasicData.length-1].microcontrollerVoltage,
      "number_of_sleep_level":this.microcontrollerBasicData[this.microcontrollerBasicData.length-1].numberOfSleepLevels,
      "current_for_level":this.microcontrollerBasicData[this.microcontrollerBasicData.length-1].currentForSleepLevels,
      "time_for_current_levels":this.microcontrollerBasicData[this.microcontrollerBasicData.length-1].timeForCurrentLevels,
      "pin_map": this.prepareMicrocontrollerPinMap(this.microcontrollerPinData[this.microcontrollerPinData.length -1 ]),
      "configuration": this.prepareMicrocontrollerConfiguration(this.microcontrollerPinData[this.microcontrollerPinData.length -1 ])
    }
  }


  addMicroControllerToBackend () {
    let microcontroller = this.prepareMicrocontrollerData();
    this.http.post('http://192.168.8.102:8090/microcontroller', microcontroller).subscribe(
      (response) => {console.log(response); alert('Microcontroller Added Successfully')},
      (error) => console.log(error)
    );

  }

  prepareMicrocontrollerConfiguration(pinArray) {
    let configuration = '';

    let numberOfGPIO = 0;
    let numberOfADC = 0;
    let numberOfPWM = 0;
    let numberOfHSPI_CS = 0;
    let numberOfHSPI_MOSI = 0;
    let numberOfHSPI_MISO = 0;
    let numberOfHSPI_CLK = 0;
    let numberOfSPI_CS = 0;
    let numberOfEXT_RSTB = 0;
    let numberOfCHIP_EN = 0;
    let numberOfURXD_2 = 0;
    let numberOfUTXD_1 = 0;
    let numberOfURXD_1 = 0;
    let numberOfUTXD_2 = 0;
    let numberOfVCC = 0;
    let numberOfGND = 0;

    for (let pin of pinArray.Pins){

      if(pin.pinType == 'GPIO'){ numberOfGPIO += 1;}
      if(pin.pinType == 'ADC'){ numberOfADC += 1;}
      if(pin.pinType == 'PWM'){ numberOfPWM += 1;}
      if(pin.pinType == 'HSPI_CS'){ numberOfHSPI_CS += 1;}
      if(pin.pinType == 'HSPI_MOSI'){ numberOfHSPI_MOSI += 1;}
      if(pin.pinType == 'HSPI_MISO'){ numberOfHSPI_MISO += 1;}
      if(pin.pinType == 'HSPI_CLK'){ numberOfHSPI_CLK += 1;}
      if(pin.pinType == 'SPI_CS'){ numberOfSPI_CS += 1;}
      if(pin.pinType == 'EXT_RSTB'){ numberOfEXT_RSTB += 1;}
      if(pin.pinType == 'CHIP_EN'){ numberOfCHIP_EN += 1;}
      if(pin.pinType == 'URXD_2'){ numberOfURXD_2 += 1;}
      if(pin.pinType == 'UTXD_1'){ numberOfUTXD_1 += 1;}
      if(pin.pinType == 'URXD_1'){ numberOfURXD_1 += 1;}
      if(pin.pinType == 'UTXD_2'){ numberOfUTXD_2 += 1;}
      if(pin.pinType == 'VCC'){ numberOfVCC += 1;}
      if(pin.pinType == 'GND'){ numberOfGND += 1;}

    }

    if(numberOfGPIO != 0){configuration += 'GPIO-'+numberOfGPIO+',';}
    if(numberOfADC != 0){configuration += 'ADC-'+numberOfADC+',';}
    if(numberOfPWM != 0){configuration += 'PWM-'+numberOfPWM+',';}
    if(numberOfHSPI_CS != 0){configuration += 'HSPI_CS-'+numberOfHSPI_CS+',';}
    if(numberOfHSPI_MOSI != 0){configuration += 'HSPI_MOSI-'+numberOfHSPI_MOSI+',';}
    if(numberOfHSPI_MISO != 0){configuration += 'HSPI_MISO-'+numberOfHSPI_MISO+',';}
    if(numberOfHSPI_CLK != 0){configuration += 'HSPI_CLK-'+numberOfHSPI_CLK+',';}
    if(numberOfSPI_CS != 0){configuration += 'SPI_CS-'+numberOfSPI_CS+',';}
    if(numberOfEXT_RSTB != 0){configuration += 'EXT_RSTB-'+numberOfEXT_RSTB+',';}
    if(numberOfCHIP_EN != 0){configuration += 'CHIP_EN-'+numberOfCHIP_EN+',';}
    if(numberOfURXD_2 != 0){configuration += 'URXD_2-'+numberOfURXD_2+',';}
    if(numberOfUTXD_1 != 0){configuration += 'UTXD_1-'+numberOfUTXD_1+',';}
    if(numberOfURXD_1 != 0){configuration += 'URXD_1-'+numberOfURXD_1+',';}
    if(numberOfUTXD_2 != 0){configuration += 'UTXD_2-'+numberOfUTXD_2+',';}
    if(numberOfVCC != 0){configuration += 'VCC-'+numberOfVCC+',';}
    if(numberOfGND != 0){configuration += 'GND-'+numberOfGND+',';}


    return configuration.substring(0, configuration.length -1);
  }

  prepareMicrocontrollerPinMap (pinArray) {
    let configuration = '';
    for (let pin of pinArray.Pins){
      configuration += pin.pinName+'-'+pin.pinType+',';
    }
    return configuration.substring(0, configuration.length -1)
  }

  // microcontroller Basic Data
  microcontrollerBasicData = [];

  // Get microcontroller Basic Data
  getMicrocontrollerBasicData (object: any) {
    this.microcontrollerBasicData.push(
      {
        "microcontrollerDisplayName": object.microcontrollerDisplayName,
        "microcontrollerModelName": object.microcontrollerModelName,
        "microcontrollerVoltage": object.microcontrollerVoltage,
        "requiredPowerSupply": object.requiredPowerSupply,
        "averageOperatingCurrent":object.averageOperatingCurrent,
        "numberOfSleepLevels":object.numberOfSleepLevels,
        "currentForSleepLevels":object.currentForSleepLevels,
        "timeForCurrentLevels":object.timeForCurrentLevels,
        "microcontrollerDescription": object.microcontrollerDescription
      }
    );
  }

  // microcontroller Basic Data
  microcontrollerFunctionData = [];

  // Get microcontroller Basic Data
  getMicrocontrollerFunctionData (object: any) {
    this.microcontrollerFunctionData.push(
      {
        "microcontrollerInitializeFunction": object.microcontrollerInitializeFunction,
        "microcontrollerNetworkTechnology": object.microcontrollerNetworkTechnology
      }
    );
  }

  // References to newly added components to DOM
  pinsArray = [];

  // Added Pin Details of microcontroller
  microcontrollerPinData = [];

  getMicrocontrollerPinData (object: any) {
    this.microcontrollerPinData.push(object);
  }

  //TODO : make function to add data to backend HTTP

}
