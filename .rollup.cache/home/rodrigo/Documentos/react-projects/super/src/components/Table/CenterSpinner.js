import { jsx as _jsx } from "react/jsx-runtime";
import { CircularProgress } from '@mui/material';
var defaultProps = {
    disableShrink: false,
};
var CenterSpinner = function (_a) {
    var disableShrink = _a.disableShrink;
    return (_jsx(CircularProgress, { disableShrink: disableShrink, sx: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
        } }));
};
CenterSpinner.defaultProps = defaultProps;
export default CenterSpinner;
//# sourceMappingURL=CenterSpinner.js.map