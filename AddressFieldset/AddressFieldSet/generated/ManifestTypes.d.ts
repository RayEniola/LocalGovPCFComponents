/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    FieldTitle: ComponentFramework.PropertyTypes.StringProperty;
    BuildingName: ComponentFramework.PropertyTypes.StringProperty;
    ShowBuildingName: ComponentFramework.PropertyTypes.EnumProperty<"Yes" | "No">;
    address_line_1: ComponentFramework.PropertyTypes.StringProperty;
    address_line_2: ComponentFramework.PropertyTypes.StringProperty;
    county: ComponentFramework.PropertyTypes.StringProperty;
    town: ComponentFramework.PropertyTypes.StringProperty;
    postcode: ComponentFramework.PropertyTypes.StringProperty;
    country: ComponentFramework.PropertyTypes.StringProperty;
    country_code: ComponentFramework.PropertyTypes.StringProperty;
    option_allowcountry: ComponentFramework.PropertyTypes.StringProperty;
}
export interface IOutputs {
    BuildingName?: string;
    address_line_1?: string;
    address_line_2?: string;
    county?: string;
    town?: string;
    postcode?: string;
    country?: string;
}
