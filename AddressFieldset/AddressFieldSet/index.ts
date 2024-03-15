/* eslint-disable */
import { Completer } from "readline";
import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class AddressFieldSet implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private _container : HTMLElement
    private fieldSet : HTMLElement
    private fieldLegend : HTMLLegendElement
    private fieldTitle : string


    private buildingNameHTML : HTMLInputElement
    private addressline1HTML : HTMLInputElement
    private addressLine2HTML : HTMLInputElement
    private townHTML : HTMLInputElement
    private countyHTML : HTMLInputElement
    private countryHTML : HTMLInputElement
    private postCodeHTML : HTMLInputElement
    private legendHeader: HTMLElement
    private controlOptions : any


    private buildingNameDiv : HTMLElement
    private buildingNameLabel :HTMLLabelElement

    //Adress fields 
    private buildingName : string
    private addressLine1 : string
    private addressLine2 : string
    private addressTown : string
    private addressPostCode : string
    private addressCounty : string
    private addressCountry : string
 

    private _refreshData : EventListenerOrEventListenerObject

    private AddressOutputChanged : () => void
    
    private AddressContext : ComponentFramework.Context<IInputs>
    constructor()
    {

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        
        this.AddressContext = context
        

        this.AddressOutputChanged = notifyOutputChanged;

        let myAddressTitle = context.parameters.FieldTitle.raw || "";
        this.fieldTitle = myAddressTitle;

        
        this.buildingName = context.parameters.BuildingName.raw || "";
        this.addressLine1 = context.parameters.address_line_1.raw || ""
        this.addressLine2 = context.parameters.address_line_2.raw || ""
        this.addressTown = context.parameters.town.raw || "";
        this.addressCounty = context.parameters.county.raw || "";
        this.addressCountry = context.parameters.country.raw || "";
        this.addressPostCode = context.parameters.postcode.raw || "";

        this._container = container;
        this._container.className =  "govuk-form-group"
        this.myContainer();
        this._container.appendChild(this.fieldSet);
        
    }

    private myContainer(): void{
        
        let buildingNameLabel = this.AddressLabel("Building Name", "address-line-1")
        this.buildingNameHTML = this.AddressEntry(this.buildingNameHTML, ["govuk-input"], "address-line-1", "addressLine1", this.buildingName)
        let buildingNameDiv = this.AdressDiv(buildingNameLabel, this.buildingNameHTML)
        this.buildingNameDiv = buildingNameDiv
        this.buildingNameLabel = buildingNameLabel

        let adressline1Label = this.AddressLabel("Adress line 1", "address-line-1")
        this.addressline1HTML = this.AddressEntry(this.addressline1HTML, ["govuk-input"], "address-line-1", "addressLine1", this.addressLine1)
        let adressline1Div = this.AdressDiv(adressline1Label, this.addressline1HTML)

        let adressLine2Label = this.AddressLabel("Adress line 2", "address-line-2")
        this.addressLine2HTML = this.AddressEntry(this.addressLine2HTML, ["govuk-input"], "address-line-2", "addressLine2", this.addressLine2)
        let adressline2Div = this.AdressDiv(adressLine2Label, this.addressLine2HTML)

        let townLabel = this.AddressLabel("Town / city", "address-town")
        this.townHTML = this.AddressEntry(this.townHTML, ["govuk-input", "govuk-!-width-two-thirds"], "address-town", "addressTown", this.addressTown, "address-level2")
        let townDiv = this.AdressDiv(townLabel, this.townHTML)

        let countyLabel = this.AddressLabel("County", "address-town")
        this.countyHTML = this.AddressEntry(this.countyHTML, ["govuk-input", "govuk-!-width-two-thirds"], "address-town", "addressTown", this.addressCounty)
        let countyDiv = this.AdressDiv(countyLabel, this.countyHTML)

        let countryLabel = this.AddressLabel("Country", "address-town")
        this.countryHTML = this.AddressEntry(this.countryHTML, ["govuk-input", "govuk-!-width-two-thirds"], "address-town", "addressTown", this.addressCountry)
        let countryDiv = this.AdressDiv(countryLabel, this.countryHTML)

        let postCodeLabel = this.AddressLabel("PostCode", "address-postcode")
        this.postCodeHTML = this.AddressEntry(this.postCodeHTML, ["govuk-input", "govuk-input--width-10"], "address-postcode", "addressPostcode", this.addressPostCode)
        let postCodeDiv = this.AdressDiv(postCodeLabel, this.postCodeHTML)

        //Create the fieldset eleement with its properties
        this.fieldSet = document.createElement('fieldset');
        this.fieldSet.className = "govuk-fieldset";
        this.fieldLegend = document.createElement('legend');
        this.fieldLegend.classList.add("govuk-fieldset__legend", "govuk-fieldset__legend--l");
        this.legendHeader = document.createElement("h1")
        this.legendHeader.className = "govuk-fieldset__heading";
        this.legendHeader.innerHTML = this.fieldTitle

        this.fieldLegend.appendChild(this.legendHeader);
        this.fieldSet.appendChild(this.fieldLegend);
        this.controlOptions = {
			show_country : this.AddressContext.parameters.option_allowcountry.raw,
			show_buildingName: this.AddressContext.parameters.ShowBuildingName.raw
		}

        this.fieldSet.appendChild(this.buildingNameDiv)
        this.fieldSet.appendChild(adressline1Div)
        this.fieldSet.appendChild(adressline2Div)
        this.fieldSet.appendChild(townDiv)
        this.fieldSet.appendChild(countyDiv)
        this.fieldSet.appendChild(countryDiv)
        this.fieldSet.appendChild(postCodeDiv)

        
    }
    private AdressDiv(label : HTMLLabelElement, input: HTMLInputElement): HTMLDivElement{
        let divElementName = document.createElement("div");
        divElementName.className = "govuk-form-group" 
        divElementName.appendChild(label)
        divElementName.appendChild(input)
        return divElementName
        }

    private AddressEntry(inputElement: HTMLInputElement, elementClassList : string[], elelmentId : string, elementName: string, 
        contextval?:string, elementAutoComplete?:any ): HTMLInputElement{

        inputElement = document.createElement("input");
        inputElement.type = "text"
        inputElement.value = contextval || "";
        elementClassList.forEach(className => {
            inputElement.classList.add(className);
        });
        inputElement.id = elelmentId;
        inputElement.name = elementName;

        inputElement.value = contextval || "";

        if (typeof elementAutoComplete !== 'undefined')
        {
          inputElement.autocomplete = elementAutoComplete
        }
        
        return inputElement
    }
    private AddressLabel(labelValue : string, labelName: string):HTMLLabelElement{
        let labelClass = "govuk-label"
        let labelElementName = document.createElement("label");
        labelElementName.className = labelClass  
        labelElementName.setAttribute("for", labelName)
        labelElementName.innerHTML = labelValue
        return labelElementName

    }



    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {

        //this.buildingNameDiv = this.AdressDiv(this.buildingNameLabel, this.buildingNameHTML)
      
        
        this.controlOptions = {
			show_country : context.parameters.option_allowcountry.raw,
			show_buildingName: context.parameters.ShowBuildingName.raw
		};
                //Append all Divs to the fieldset element    
                if(this.controlOptions.show_buildingName == "Yes")
                {
                    
                    //this.fieldSet.insertBefore(this.buildingNameDiv, this.fieldSet.firstChild);  
                    //this.buildingNameDiv.style.display = 'block'
                   this.buildingNameDiv.style.visibility = 'visible'
                   this.buildingNameDiv.style.height = '70px'
                  // this.fieldSet.insertBefore(this.buildingNameDiv,null)
                    
                    
                }
                else {
                    this.buildingNameDiv.style.visibility = 'hidden';
                    this.buildingNameDiv.style.height = '0px'
                   this.fieldSet.insertBefore(this.buildingNameDiv,this.fieldSet.childNodes[1] )
                    
                
                    //this.buildingNameDiv.remove()
                    //this.buildingNameDiv.style.display = 'none' 
                    //this.fieldSet.removeChild(this.buildingNameDiv) ;
                   
               }


        this.legendHeader.innerHTML =  context.parameters.FieldTitle.raw || "";
        this.addressline1HTML.value = context.parameters.address_line_1.raw || "";
        this.buildingNameHTML.value = context.parameters.BuildingName.raw || "";
        this.addressLine2HTML.value = context.parameters.address_line_2.raw || "";
        this.townHTML.value = context.parameters.town.raw || "";
        this.countyHTML.value = context.parameters.county.raw || "";
        this.countryHTML.value = context.parameters.country.raw || "";
        this.postCodeHTML.value = context.parameters.postcode.raw || "";
        
        this.AddressOutputChanged();
       
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs
    {
        let BuildHtmlVal = this.buildingNameHTML.value
        let line1htmlValue = this.addressline1HTML.value;
        var addressOutput: { [i: string]: any } = {};

        if (this.AddressContext.parameters.BuildingName.type != null && this.controlOptions.show_buildingName == "Yes")
            addressOutput.BuildingName = BuildHtmlVal;

		if (this.AddressContext.parameters.address_line_1.type != null)
            addressOutput.address_line_1 = line1htmlValue ;

		if (this.AddressContext.parameters.address_line_2.type != null)
        addressOutput.address_line_2 = this.addressLine2HTML.value;

		if (this.AddressContext.parameters.town.type != null)
        addressOutput.town = this.townHTML.value;

		if (this.AddressContext.parameters.county.type != null)
        addressOutput.county = this.countyHTML.value;

		if (this.AddressContext.parameters.postcode.type != null)
        addressOutput.postcode = this.postCodeHTML.value;

		if (this.AddressContext.parameters.country.type != null)
        addressOutput.country = this.countryHTML.value;
        return addressOutput// {BuildingName: "this Value",address_line_1: this.addressline1HTML.value}; 
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        // Add code to cleanup control if necessary
    }
}
