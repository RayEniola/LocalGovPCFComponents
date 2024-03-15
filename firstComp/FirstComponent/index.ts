import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class FirstComponent implements ComponentFramework.StandardControl<IInputs, IOutputs> {
private myNotifyOutputChange: () => void;
private myMainDiv : HTMLDivElement;
private myTextBox: HTMLTextAreaElement;
private myLabel : HTMLLabelElement;
private myIsUpperCase: boolean;

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

    //1. Complete this for the look of the elements. This will return values from the Manifest but it will not sync until step 2
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        this.myNotifyOutputChange = notifyOutputChanged;
        this.myMainDiv = document.createElement("div");
        this.myTextBox = document.createElement("textarea");
        this.myTextBox.value = context.parameters.TextValue.raw || "";

        this.myLabel = document.createElement("label");
        this.myIsUpperCase = context.parameters.IsUpperCase.raw || false;

        this.myMainDiv.appendChild(this.myTextBox);
        this.myMainDiv.appendChild(this.myLabel);

        container.appendChild(this.myMainDiv);

        // Add control initialization code
    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    //Changes like height and width, field value and dataset values, labels and visible. 
    //Context are values defined in the manifest and also utility functions 
    //called prior to a component receiving new data 

    //3 : This controls what is being displayed to the end users. finally
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        this.myTextBox.value = context.parameters.TextValue.raw || "";
        this.myIsUpperCase = context.parameters.IsUpperCase.raw || false;

        if(this.myIsUpperCase)
        {
            this.myLabel.innerHTML = "Upper case";
            this.myTextBox.value = this.myTextBox.value.toUpperCase()
        }
        else
        {
            this.myLabel.innerHTML = "Upper / Lower"
        }

        this.myNotifyOutputChange()
        // Add code to update control view
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    //
    //2.  After completing 1 above start working on this 
    // Expecting the properties that are bound. 
    public getOutputs(): IOutputs
    {
        return {
            TextValue : this.myTextBox.value,
            IsUpperCase: this.myIsUpperCase
        };
    }


    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    //When the control is removed from the DOM
    public destroy(): void
    {
        // Add code to cleanup control if necessary
    }
}
