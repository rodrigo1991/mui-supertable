import { TableCell } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableActionCell = styled(TableCell)(({ theme }) => ({
  whiteSpace: 'nowrap',
  paddingTop: 0,
  paddingBottom: 0,
  position: 'sticky',
  right: 0,
  background: theme.palette.background.paper,
  borderLeft: '2px solid black',
}));
export default StyledTableActionCell;
