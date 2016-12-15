/**
 * configurations.
 */
export class ValidationConfig {
    /**
     * debounce delay of ms between server requests while user is typing into input field. 
     */
    public validationTimoutMs: number;

    /**
     * callback, occurs when some field error occured, could be used for ui purposes.
     */
    public fieldErrorHandler: (isError: boolean, element: any, fieldName: string) => void;

    /**
     * template html for validation messages directive. 
     */
    public templateHtml: string;
}