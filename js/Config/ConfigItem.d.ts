import GetHtmlElementInterface from "../Element/GetHtmlElementInterface.js";
import GetValueInterface from "../Element/GetValueInterface.js";
export default class ConfigItem {
    protected propertyName: string;
    protected label: string;
    protected input: GetHtmlElementInterface & GetValueInterface;
    static readonly LINE_WIDTH_PROPERTY = "line_width";
    static readonly COLOR_PROPERTY = "color";
    static readonly OPACITY_PROPERTY = "opacity";
    static readonly CONTOUR_PROPERTY = "contour";
    static readonly ROUND_CAP_PROPERTY = "round_cap";
    static readonly TOUCHES_PER_TICK_PROPERTY = "touches_per_tick";
    static readonly BRUSH_AREA_DIAMETER_PROPERTY = "brush_area_diameter";
    static readonly BRUSH_AREA_WIDTH_PROPERTY = "brush_area_width";
    static readonly BRUSH_AREA_HEIGHT_PROPERTY = "brush_area_height";
    static readonly ELEMENT_DIAMETER_PROPERTY = "element_diameter";
    static readonly ELEMENT_WIDTH_PROPERTY = "element_width";
    static readonly ELEMENT_HEIGHT_PROPERTY = "element_height";
    static readonly ELEMENT_RANDOM_DIAMETER_SPREAD_PROPERTY = "element_random_diameter_spread";
    static readonly BRUSH_AREA_ROTATION_PROPERTY = "brush_area_rotation";
    static readonly ELEMENT_ROTATION_PROPERTY = "element_rotation";
    static readonly ELEMENT_EDGES_COUNT_PROPERTY = "element_edges_count";
    static readonly ELEMENT_RANDOM_RED_COLOR_SPREAD_PROPERTY = "element_random_red_color_spread";
    static readonly ELEMENT_RANDOM_GREEN_COLOR_SPREAD_PROPERTY = "element_random_green_color_spread";
    static readonly ELEMENT_RANDOM_BLUE_COLOR_SPREAD_PROPERTY = "element_random_blue_color_spread";
    static readonly ELEMENT_DISTANCE_FROM_CLICK_PROPERTY = "element_distance_from_click";
    static readonly ELEMENT_LAPS_PER_SECOND_PROPERTY = "element_laps_per_second";
    static readonly GUM_ELASTICITY_PROPERTY = "gum_elasticity";
    static readonly STRIPED_LINE_PROPERTY = "striped_line";
    static readonly STRIPE_LINE_LENGTH_PROPERTY = "stripe_line_length";
    static readonly STRIPE_GAP_LENGTH_PROPERTY = "stripe_gap_length";
    static readonly LINE_WIDTH_FUNCTION_PROPERTY = "line_width_function";
    static readonly COLOR_FUNCTION_ENABLED_PROPERTY = "color_function_enabled";
    static readonly RED_VALUE_FUNCTION_PROPERTY = "red_value_function";
    static readonly GREEN_VALUE_FUNCTION_PROPERTY = "green_value_function";
    static readonly BLUE_VALUE_FUNCTION_PROPERTY = "blue_value_function";
    static readonly OPACITY_FUNCTION_PROPERTY = "opacity_function";
    static readonly ELEMENT_DIAMETER_FUNCTION_PROPERTY = "element_diameter_function";
    static readonly ELEMENT_ROTATION_FUNCTION_PROPERTY = "element_rotation_function";
    constructor(propertyName: string, label: string, input: GetHtmlElementInterface & GetValueInterface);
    getPropertyName(): string;
    getElementWithValue(): HTMLElement;
    getLabel(): string;
    getValue(): string;
}
