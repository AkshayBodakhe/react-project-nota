import SelectInput from "../../select-input";
import UseAutocomplete from "../AutoComplete";
import Calendar from "../Calendar";
import Dropdown from "../Dropdown";
import MultiSelectWithCheckBox from "../MultiSelectWithCheckBox";
import RadioBtn from "../RadioBtn";
import Textfield from "../TextField";
import CustomTimePicker from "../TimePicker";

export default function index({ control, ...rest }: any) {
    switch (control) {
        case 'autocomplete':
            return <UseAutocomplete {...rest} />;
        case 'select':
            return <SelectInput {...rest} />;
        case 'dropdown':
            return <Dropdown {...rest} />;
        case 'radio':
            return <RadioBtn {...rest} />;
        case 'multi-select-checkbox':
            return <MultiSelectWithCheckBox {...rest} />;
        case 'calendar':
            return <Calendar {...rest} />
        case 'time':
            return <CustomTimePicker {...rest} />
        default:
            return <Textfield {...rest} />;
    }
}