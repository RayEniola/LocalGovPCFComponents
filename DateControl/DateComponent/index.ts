import { parse } from "path";
import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class DateComponent implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private mynotifyOutputChanged: () => void;
    public  isErrorShow: boolean;

    //Create the HtMl elements
    private mainDiv : HTMLElement; 
    private mainFieldSet : HTMLFieldSetElement;
    private mainlegend : HTMLLegendElement;
    private mainHeader : HTMLHeadingElement;
    private divHint: HTMLDivElement;
    private divDateInput: HTMLDivElement;
    private divDayFormGroup : HTMLDivElement;
    private divMonthFormGroup : HTMLDivElement;
    private divYearFormGroup : HTMLDivElement;
    private divItemDay: HTMLDivElement;
    private divItemMonth: HTMLDivElement;
    private divItemYear: HTMLDivElement;
    private labelDay: HTMLLabelElement;
    private labelMonth: HTMLLabelElement;
    private labelYear: HTMLLabelElement;
    private inputDay: HTMLInputElement;
    private inputMonth: HTMLInputElement;
    private inputYear: HTMLInputElement;
    private errorParagraph : HTMLParagraphElement;
    private errorSpan : HTMLSpanElement;
    
    // Event Listeners for each inputElement 
    private dayInputChanged: EventListenerOrEventListenerObject;
    private monthInputChanged: EventListenerOrEventListenerObject;
    private yearInputChanged: EventListenerOrEventListenerObject;

    /**
     * Empty constructor.
     */
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
        // Add control initialization code
        this.mynotifyOutputChanged = notifyOutputChanged;
        
        //set Context variables 
        let dateContext = context.parameters.InputDate.raw  ;
        let dayContext = dateContext?.getDay();
        let monthContext = dateContext?.getMonth();
        let yearContext = dateContext?.getFullYear();
        this.isErrorShow = context.parameters.IsError.raw;

        //Create HTML Element
        this.mainDiv = container
        this.mainFieldSet = document.createElement('fieldset');
        this.mainlegend = document.createElement('legend');
        this.mainHeader = document.createElement('h1');
        this.divHint = document.createElement('div');

        this.divDateInput = document.createElement('div');
        
        this.divItemDay = document.createElement('div');
        this.divItemMonth = document.createElement('div');
        this.divItemYear = document.createElement('div');

        this.divDayFormGroup = document.createElement('div');
        this.divMonthFormGroup = document.createElement('div');
        this.divYearFormGroup = document.createElement('div');

        this.labelDay = document.createElement('label');
        this.labelMonth = document.createElement('label');
        this.labelYear = document.createElement('label');
        this.inputDay = document.createElement('input');
        this.inputMonth = document.createElement('input');
        this.inputYear = document.createElement('input');

        this.errorParagraph = document.createElement("p");
        this.errorSpan = document.createElement("span");

        // Set attributes and innerHTML as per your HTML
        // For example:
        this.mainDiv.className = "govuk-form-group";
        this.mainDiv.style.left;
        this.mainFieldSet.className = "govuk-fieldset";
        this.mainFieldSet.setAttribute("role", "group");
        this.mainFieldSet.setAttribute("aria-describedby", "passport-issued-hint");

        this.mainlegend.className = "govuk-fieldset__legend govuk-fieldset__legend--l";
        this.mainHeader.className = "govuk-fieldset__heading";
        this.mainHeader.innerHTML = context.parameters.Title.raw || "";
        //this.mainHeader.innerHTML = "When was your passport issued?";

        this.divHint.innerHTML = "For example, 27 3 2007";
        this.divHint.id = "passport-issued-hint";
        this.divHint.className = "govuk-hint";
        
        this.divDateInput.className = "govuk-date-input";
        this.divDateInput.id = "passport-issued";

        this.divItemDay.classList.add("govuk-date-input__item");
        this.divItemMonth.classList.add("govuk-date-input__item");
        this.divItemYear.classList.add("govuk-date-input__item");

        this.divDayFormGroup.classList.add("govuk-form-group");
        this.divMonthFormGroup.classList.add("govuk-form-group");
        this.divYearFormGroup.classList.add("govuk-form-group");

        this.labelDay.setAttribute("for", "passport-issued-day");
        this.labelDay.className = "govuk-label govuk-date-input__label";
        this.labelDay.innerHTML = "Day";

        this.labelMonth.setAttribute("for", "passport-issued-month");
        this.labelMonth.className = "govuk-label govuk-date-input__label";
        this.labelMonth.innerHTML = "Month";

        this.labelYear.setAttribute("for", "passport-issued-year");
        this.labelYear.className = "govuk-label govuk-date-input__label";
        this.labelYear.innerHTML = "Year"

        this.inputDay.className = "govuk-input govuk-date-input__input govuk-input--width-2";
        this.inputDay.id = "passport-issued-day";
        this.inputDay.name = "passport-issued-day";
        this.inputDay.type = "text";
        this.inputDay.inputMode = "numeric"
        this.inputDay.value = dayContext?.toString() || "";


        this.inputMonth.className = "govuk-input govuk-date-input__input govuk-input--width-2";
        this.inputMonth.id = "passport-issued-month";
        this.inputMonth.name = "passport-issued-month";
        this.inputMonth.type = "text";
        this.inputMonth.inputMode = "numeric";
        this.inputMonth.value = monthContext?.toString() || "";

        this.inputYear.className = "govuk-input govuk-date-input__input govuk-input--width-4";
        this.inputYear.id = "passport-issued-year";
        this.inputYear.name = "passport-issued-year";
        this.inputYear.type = "text";
        this.inputYear.inputMode = "numeric";
        this.inputYear.value = yearContext?.toString() || "";




        // Append elements
        this.mainlegend.appendChild(this.mainHeader);

        this.divDayFormGroup.appendChild(this.labelDay);
        this.divDayFormGroup.appendChild(this.inputDay);
        this.divItemDay.appendChild(this.divDayFormGroup);

        this.divMonthFormGroup.appendChild(this.labelMonth);
        this.divMonthFormGroup.appendChild(this.inputMonth);
        this.divItemMonth.appendChild(this.divMonthFormGroup);

        this.divYearFormGroup.appendChild(this.labelYear);
        this.divYearFormGroup.appendChild(this.inputYear);
        this.divItemYear.appendChild(this.divYearFormGroup);

        this.divDateInput.appendChild(this.divItemDay);
        this.divDateInput.appendChild(this.divItemMonth);
        this.divDateInput.appendChild(this.divItemYear);

        this.mainFieldSet.appendChild(this.mainlegend);

        this.mainFieldSet.appendChild(this.divHint);
        
        
        this.mainFieldSet.appendChild(this.divDateInput);
        

        this.mainDiv.appendChild(this.mainFieldSet);

        //container.appendChild(this.mainDiv)
    }
    


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */

    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        let dateContext = context.parameters.InputDate.raw  ;
        let dayContext = dateContext?.getDate();

        let monthContext = dateContext?.getMonth();
        if(monthContext){
            monthContext = monthContext + 1
        }
        if(!this.isErrorShow ){
            this.mainFieldSet.removeChild(this.errorParagraph)
            this.mainDiv.className = "govuk-form-group govuk-form-group--error";
            this.mainFieldSet.setAttribute("aria-describedby", "passport-issued-hint passport-issued");
            this.inputDay.className = "govuk-input govuk-date-input__input govuk-input--width-2 govuk-input";
            this.inputMonth.className = "govuk-input govuk-date-input__input govuk-input--width-2 govuk-input";
            this.inputYear.className = "govuk-input govuk-date-input__input govuk-input--width-2 govuk-input";
        }
        else{
            
            this.errorParagraph.id = "passport-issued-error";
            this.errorParagraph.className = "govuk-error-message";
            this.errorParagraph.innerHTML = context.parameters.ErrorMessage.raw || "";
            
            this.errorSpan.className = "govuk-visually-hidden"
            this.errorSpan.innerHTML = "Error :"
            this.errorParagraph.appendChild(this.errorSpan);
            this.mainFieldSet.appendChild(this.errorParagraph);
            this.mainDiv.className = "govuk-form-group govuk-form-group--error";
            this.mainFieldSet.setAttribute("aria-describedby", "passport-issued-hint passport-issued-error");
            this.inputDay.className = "govuk-input govuk-date-input__input govuk-input--width-2 govuk-input--error";
            this.inputMonth.className = "govuk-input govuk-date-input__input govuk-input--width-2 govuk-input--error";
            this.inputYear.className = "govuk-input govuk-date-input__input govuk-input--width-2 govuk-input--error";
        }

        let yearContext = dateContext?.getFullYear();

        this.inputDay.value = dayContext?.toString()|| "";

        this.inputMonth.value = monthContext?.toString() || "";

        this.inputYear.value = yearContext?.toString() || "";
        this.mainHeader.innerHTML = context.parameters.Title.raw || "";
        this.isErrorShow = context.parameters.IsError.raw || false;

        this.errorParagraph.innerHTML = context.parameters.ErrorMessage.raw || "";
        this.errorSpan.innerHTML = "Error :"
        this.mynotifyOutputChanged();

    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs
    {
        var dayInt = Number(this.inputDay.value);
        var monthInt = parseInt(this.inputMonth.value);
        var yearInt = Number(this.inputYear.value);
        var dateVal = new Date(yearInt, monthInt, dayInt).toDateString()

        return {
           InputDate : new Date(dateVal) ,
           
        };
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
