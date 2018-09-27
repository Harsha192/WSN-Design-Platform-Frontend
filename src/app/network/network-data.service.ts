import {Injectable} from "@angular/core";
import {Http} from "@angular/http"

@Injectable()
export class NetworkDataService {

  constructor(private http: Http) {}

  prepareNetworkData () {
    return {
      "model_name":this.networkBasicData[this.networkBasicData.length-1].networkModelName,
      "display_name":this.networkBasicData[this.networkBasicData.length-1].networkDisplayName,
      "description":this.networkBasicData[this.networkBasicData.length-1].networkDescription,

      "pin_map":this.prepareNetworkDevicePinMap(this.networkPinData[this.networkPinData.length -1]),
      "configuration":this.prepareNetworkDeviceConfiguration(this.networkPinData[this.networkPinData.length -1]),

      "hardware_enable":'Yes' == this.networkBasicData[this.networkBasicData.length - 1].networkHardwareEnable,

      "includes":'esp8266' == this.networkFunctionData[this.networkFunctionData.length -1].microcontrollerType ?
        this.networkFunctionData[this.networkFunctionData.length -1].includesFunction:'',
      "helper_function":'esp8266' == this.networkFunctionData[this.networkFunctionData.length -1].microcontrollerType ?
        this.networkFunctionData[this.networkFunctionData.length -1].helperFunction:'',

      "global_server":'esp8266' == this.networkFunctionData[this.networkFunctionData.length -1].microcontrollerType ?
        this.networkFunctionData[this.networkFunctionData.length -1].serverGlobalVariableFunction:'',
      "global_client":'esp8266' == this.networkFunctionData[this.networkFunctionData.length -1].microcontrollerType ?
        this.networkFunctionData[this.networkFunctionData.length -1].clientGlobalVariableFunction:'',
      "cpp_send":'esp8266' == this.networkFunctionData[this.networkFunctionData.length -1].microcontrollerType ?
        this.networkFunctionData[this.networkFunctionData.length -1].dataSendingFunction:'',
      "cpp_receive":'esp8266' == this.networkFunctionData[this.networkFunctionData.length -1].microcontrollerType ?
        this.networkFunctionData[this.networkFunctionData.length -1].dataReceivingFunction:'',
      "cpp_connect":'esp8266' == this.networkFunctionData[this.networkFunctionData.length -1].microcontrollerType ?
        this.networkFunctionData[this.networkFunctionData.length -1].connectingFunction:'',
      "cpp_disconnect":'esp8266' == this.networkFunctionData[this.networkFunctionData.length -1].microcontrollerType ?
        this.networkFunctionData[this.networkFunctionData.length -1].disconnectingFunction:'',
      "client_setup":'esp8266' == this.networkFunctionData[this.networkFunctionData.length -1].microcontrollerType ?
        this.networkFunctionData[this.networkFunctionData.length -1].clientSetupFunction:'',
      "server_setup":'esp8266' == this.networkFunctionData[this.networkFunctionData.length -1].microcontrollerType ?
        this.networkFunctionData[this.networkFunctionData.length -1].serverSetupFunction:'',

    };
  }

  addNetworkDeviceToBackend () {
    let network = this.prepareNetworkData();
    console.log(network);
    // alert('Communication device Added Successfully');
    this.http.post('http://192.168.8.102:8090/communication', network).subscribe(
      (response) => {console.log(response); alert('Communication device Added Successfully')},
      (error) => console.log(error)
    );

  }


  prepareNetworkDeviceConfiguration(pinArray) {
    let configuration = '';

    let numberOfDIGITAL_INPUT = 0;
    let numberOfDIGITAL_OUTPUT = 0;
    let numberOfANALOG_INPUT = 0;
    let numberOfANALOG_OUTPUT = 0;
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

      if(pin.pinType == 'DIGITAL_INPUT'){ numberOfDIGITAL_INPUT += 1;}
      if(pin.pinType == 'DIGITAL_OUTPUT'){ numberOfDIGITAL_OUTPUT += 1;}
      if(pin.pinType == 'ANALOG_INPUT'){ numberOfANALOG_INPUT += 1;}
      if(pin.pinType == 'ANALOG_OUTPUT'){ numberOfANALOG_OUTPUT += 1;}
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

    if(numberOfDIGITAL_INPUT != 0){configuration += 'DIGITAL_INPUT-'+numberOfDIGITAL_INPUT+',';}
    if(numberOfDIGITAL_OUTPUT != 0){configuration += 'DIGITAL_OUTPUT-'+numberOfDIGITAL_OUTPUT+',';}
    if(numberOfANALOG_INPUT != 0){configuration += 'ANALOG_INPUT-'+numberOfANALOG_INPUT+',';}
    if(numberOfANALOG_OUTPUT != 0){configuration += 'ANALOG_OUTPUT-'+numberOfANALOG_OUTPUT+',';}
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


  prepareNetworkDevicePinMap (pinArray) {
    let configuration = '';
    for (let pin of pinArray.Pins){
      configuration += pin.pinName+'-'+pin.pinType+',';
    }
    return configuration.substring(0, configuration.length -1)
  }

  //Array to add basic network device details
  networkBasicData = [];

  // References to newly added components to DOM
  pinsArray = [];

  // Added Pin Details of sensor
  networkPinData = [];

  //References to newly added function set components
  functionSetArray = [];

  //sensor function data
  networkFunctionData = [];

  getNetworkPinData (object: any) {
    this.networkPinData.push(object);
  }

  // Function to get network device details
  getNetworkBasicData (object: any) {
    this.networkBasicData.push(
      {
        "networkDisplayName" : object.networkDisplayName,
        "networkModelName" : object.networkModelName,
        "networkDescription" : object.networkDescription,
        "networkHardwareEnable":object.hardwarePlatform
      }
    );
  }

  getNetworkFunctionData (object: any) {
    this.networkFunctionData.push(object)
  }

}
