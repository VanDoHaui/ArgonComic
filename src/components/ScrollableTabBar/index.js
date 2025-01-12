const React = require("react");
const { ViewPropTypes } = (ReactNative = require("react-native"));
const PropTypes = require("prop-types");
const createReactClass = require("create-react-class");
const { metrics } = require("./../../utils/themes");
const theme = require("../../assets/custom-theme.json");
const {
    View,
    Animated,
    StyleSheet,
    ScrollView,
    Text,
    Platform,
    Dimensions,
    TouchableOpacity,
} = ReactNative;
const WINDOW_WIDTH = Dimensions.get("window").width;

const ScrollableTabBar = createReactClass({
    propTypes: {
        goToPage: PropTypes.func,
        activeTab: PropTypes.number,
        tabs: PropTypes.array,
        backgroundColor: PropTypes.string,
        activeTextColor: PropTypes.string,
        inactiveTextColor: PropTypes.string,
        scrollOffset: PropTypes.number,
        style: ViewPropTypes.style,
        tabStyle: ViewPropTypes.style,
        tabInactiveStyle: ViewPropTypes.style,
        tabsContainerStyle: ViewPropTypes.style,
        textStyle: Text.propTypes.style,
        renderTab: PropTypes.func,
        underlineStyle: ViewPropTypes.style,
        onScroll: PropTypes.func,
        disableTab: PropTypes.bool,
        numberBadges: PropTypes.array,
        light: PropTypes.bool,
        type: PropTypes.oneOf(["pill", "tag"]),
    },

    getDefaultProps() {
        return {
            scrollOffset: 52,
            activeTextColor: "navy",
            inactiveTextColor: "black",
            backgroundColor: null,
            style: {},
            tabStyle: {},
            tabsContainerStyle: {},
            underlineStyle: {},
            disableTab: false,
        };
    },

    getInitialState() {
        this._tabsMeasurements = [];
        return {
            _leftTabUnderline: new Animated.Value(0),
            _widthTabUnderline: new Animated.Value(0),
            _containerWidth: null,
        };
    },

    componentDidMount() {
        this.props.scrollValue.addListener(this.updateView);
    },

    updateView(offset) {
        const position = Math.floor(offset.value);
        const pageOffset = offset.value % 1;
        const tabCount = this.props.tabs.length;
        const lastTabPosition = tabCount - 1;

        if (tabCount === 0 || offset.value < 0 || offset.value > lastTabPosition) {
            return;
        }

        if (
            this.necessarilyMeasurementsCompleted(
                position,
                position === lastTabPosition,
            )
        ) {
            this.updateTabPanel(position, pageOffset);
            this.updateTabUnderline(position, pageOffset, tabCount);
        }
    },

    necessarilyMeasurementsCompleted(position, isLastTab) {
        return (
            this._tabsMeasurements[position] &&
            (isLastTab || this._tabsMeasurements[position + 1]) &&
            this._tabContainerMeasurements &&
            this._containerMeasurements
        );
    },

    updateTabPanel(position, pageOffset) {
        const containerWidth = this._containerMeasurements.width;
        const tabWidth = this._tabsMeasurements[position].width;
        const nextTabMeasurements = this._tabsMeasurements[position + 1];
        const nextTabWidth =
            (nextTabMeasurements && nextTabMeasurements.width) || 0;
        const tabOffset = this._tabsMeasurements[position].left;
        const absolutePageOffset = pageOffset * tabWidth;
        let newScrollX = tabOffset + absolutePageOffset;

        // center tab and smooth tab change (for when tabWidth changes a lot between two tabs)
        newScrollX -=
            (containerWidth -
                (1 - pageOffset) * tabWidth -
                pageOffset * nextTabWidth) /
            2;
        newScrollX = newScrollX >= 0 ? newScrollX : 0;

        if (Platform.OS === "android") {
            this._scrollView.scrollTo({ x: newScrollX, y: 0, animated: false });
        } else {
            const rightBoundScroll =
                this._tabContainerMeasurements.width -
                this._containerMeasurements.width;
            newScrollX =
                newScrollX > rightBoundScroll ? rightBoundScroll : newScrollX;
            this._scrollView.scrollTo({ x: newScrollX, y: 0, animated: false });
        }
    },

    updateTabUnderline(position, pageOffset, tabCount) {
        const lineLeft = this._tabsMeasurements[position].left;
        const lineRight = this._tabsMeasurements[position].right;

        if (position < tabCount - 1) {
            const nextTabLeft = this._tabsMeasurements[position + 1].left;
            const nextTabRight = this._tabsMeasurements[position + 1].right;

            const newLineLeft =
                pageOffset * nextTabLeft + (1 - pageOffset) * lineLeft;
            const newLineRight =
                pageOffset * nextTabRight + (1 - pageOffset) * lineRight;

            this.state._leftTabUnderline.setValue(newLineLeft);
            this.state._widthTabUnderline.setValue(newLineRight - newLineLeft);
        } else {
            this.state._leftTabUnderline.setValue(lineLeft);
            this.state._widthTabUnderline.setValue(lineRight - lineLeft);
        }
    },

    renderTab(name, page, isTabActive, onPressHandler, onLayoutHandler) {
        const { disableTab, numberBadges } = this.props;
        const textColor = isTabActive ? theme["color-primary-600"] : "#667085";
        const fontWeight = isTabActive ? "700" : "700";
        const number =
            numberBadges && (numberBadges[page] > 100 ? "99+" : numberBadges[page]);
        const title = number && number != 0 ? `${name} (${number})` : `${name}`;

        if (this.props.type == "pill") {
            let bgColor = isTabActive ? "white" : "#101828" + "33";
            let textColor = isTabActive ? theme["color-primary-600"] : "white";
            if (this.props.light) {
                bgColor = isTabActive ? theme["color-primary-600"] : "#EEEBFF";
                textColor = isTabActive ? "white" : theme["color-primary-600"];
            }

            return (
                <TouchableOpacity
                    key={`${name}_${page}`}
                    activeOpacity={0.5}
                    accessible={true}
                    accessibilityLabel={name}
                    accessibilityTraits="button"
                    onPress={() => onPressHandler(page)}
                    onLayout={onLayoutHandler}
                    disabled={disableTab}>
                    <View
                        style={[
                            styles.tabPill,
                            { backgroundColor: bgColor },
                            this.props.tabStyle,
                            !isTabActive && this.props.tabInactiveStyle,
                        ]}>
                        <Text
                            style={[{ color: textColor, fontWeight: "400" }, styles.textTab]}>
                            {`${title}`}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }

        if (this.props.type == "tag") {
            let bgColor = isTabActive ? "#D0CAFF" : colors.white;
            let borderColor = isTabActive ? theme["color-primary-600"] : "#667085";
            let textColor = isTabActive ? theme["color-primary-600"] : "#101828";

            return (
                <TouchableOpacity
                    key={`${name}_${page}`}
                    activeOpacity={0.5}
                    accessible={true}
                    accessibilityLabel={name}
                    accessibilityTraits="button"
                    onPress={() => onPressHandler(page)}
                    onLayout={onLayoutHandler}
                    disabled={disableTab}>
                    <View
                        style={[
                            styles.tabTag,
                            { borderColor: borderColor, borderWidth: 1 },
                            { backgroundColor: bgColor },
                            this.props.tabStyle,
                            !isTabActive && this.props.tabInactiveStyle,
                        ]}>
                        <Text
                            style={[{ color: textColor, fontWeight: "400" }, styles.textTab]}>
                            {`${title}`}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity
                key={`${name}_${page}`}
                activeOpacity={0.5}
                accessible={true}
                accessibilityLabel={name}
                accessibilityTraits="button"
                onPress={() => onPressHandler(page)}
                onLayout={onLayoutHandler}
                disabled={disableTab}>
                <View
                    style={[
                        styles.tab,
                        this.props.tabStyle,
                        !isTabActive && this.props.tabInactiveStyle,
                    ]}>
                    <Text style={[{ color: textColor, fontWeight }, styles.textTab]}>
                        {`${title}`}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    },

    measureTab(page, event) {
        const { x, width, height } = event.nativeEvent.layout;
        this._tabsMeasurements[page] = { left: x, right: x + width, width, height };
        this.updateView({ value: this.props.scrollValue.__getValue() });
    },

    render() {
        const tabUnderlineStyle = {
            position: "absolute",
            height: this.props.type == "pill" || this.props.type == "tag" ? 0 : 2,
            backgroundColor: theme["color-primary-600"],
            bottom: 0,
        };

        const dynamicTabUnderline = {
            left: this.state._leftTabUnderline,
            width: this.state._widthTabUnderline,
        };

        const { onScroll } = this.props;

        return (
            <View
                style={[
                    styles.container,
                    { backgroundColor: this.props.backgroundColor },
                    this.props.style,
                ]}
                onLayout={this.onContainerLayout}>
                <ScrollView
                    ref={scrollView => {
                        this._scrollView = scrollView;
                    }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    directionalLockEnabled={true}
                    bounces={false}
                    scrollsToTop={false}
                    onScroll={onScroll}
                    scrollEventThrottle={16}>
                    <View
                        style={[
                            styles.tabs,
                            this.props.type == "pill" && [
                                styles.tabsPill,
                                this.props.light && { backgroundColor: "white" },
                            ],
                            this.props.type == "tag" && [
                                styles.tabsTag,
                                this.props.light && { backgroundColor: "white" },
                            ],
                            this.props.light &&
                            this.props.type != "pill" &&
                            this.props.type != "tag" && {
                                backgroundColor: "#DDDEDF33",
                            },
                            { width: this.state._containerWidth },
                            this.props.tabsContainerStyle,
                        ]}
                        ref={"tabContainer"}
                        onLayout={this.onTabContainerLayout}>
                        {this.props.tabs.map((name, page) => {
                            const isTabActive = this.props.activeTab === page;
                            const renderTab = this.props.renderTab || this.renderTab;
                            return renderTab(
                                name,
                                page,
                                isTabActive,
                                this.props.goToPage,
                                this.measureTab.bind(this, page),
                            );
                        })}
                        <Animated.View style={[tabUnderlineStyle, dynamicTabUnderline]} />
                    </View>
                </ScrollView>
            </View>
        );
    },

    componentDidUpdate(prevProps) {
        // If the tabs change, force the width of the tabs container to be recalculated
        if (
            JSON.stringify(prevProps.tabs) !== JSON.stringify(this.props.tabs) &&
            this.state._containerWidth
        ) {
            this.setState({ _containerWidth: null });
        }
    },

    onTabContainerLayout(e) {
        this._tabContainerMeasurements = e.nativeEvent.layout;
        let width = this._tabContainerMeasurements.width;
        if (width < WINDOW_WIDTH) {
            width = WINDOW_WIDTH;
        }
        this.setState({ _containerWidth: width });
        this.updateView({ value: this.props.scrollValue.__getValue() });
    },

    onContainerLayout(e) {
        this._containerMeasurements = e.nativeEvent.layout;
        this.updateView({ value: this.props.scrollValue.__getValue() });
    },
});

module.exports = ScrollableTabBar;

const styles = StyleSheet.create({
    tab: {
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
    },
    tabTag: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginHorizontal: metrics.space * 0.5,
    },
    tabPill: {
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
        borderRadius: 96,
        marginHorizontal: metrics.space * 0.5,
    },
    container: {
        borderWidth: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: "#EAECF0",
    },
    containerPill: {},
    tabs: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    tabsPill: {
        paddingHorizontal: metrics.space * 1.5,
        backgroundColor: theme["color-primary-600"],
        paddingVertical: metrics.space,
    },
    tabsTag: {
        paddingHorizontal: metrics.space * 1.5,
        backgroundColor: theme["color-primary-600"],
        paddingVertical: metrics.space,
    },
    textTab: {
        fontSize: 14,
        lineHeight: 20,
    },
    textBadge: {
        color: "white",
        fontSize: 10,
    },
});
