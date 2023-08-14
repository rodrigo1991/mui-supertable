import { TableFooter, TableRow, Chip, ChipProps } from '@mui/material';
import { FC } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import WarningIcon from '@mui/icons-material/Warning';

import StyledTableFooterCell from './StyledTableFooterCell';

interface EnhancedTableFooterProps {
  chips: ChipProps[];
  sm: boolean;
}

const EnhancedTableFooter: FC<EnhancedTableFooterProps> = ({ chips, sm }) => (
  <TableFooter sx={{ float: sm ? 'left' : 'none' }}>
    <TableRow>
      {chips.map(chip => (
        <StyledTableFooterCell key={Math.random()}>
          {chip.color === 'error' ? (
            <Chip
              color={chip.color}
              variant={chip.variant}
              label={chip.label}
              clickable
              onClick={chip.onClick}
              onDelete={chip.onDelete}
            />
          ) : (
            <Chip
              color={chip.color}
              variant={chip.variant}
              label={chip.label}
              clickable
              onClick={chip.onClick}
              onDelete={chip.onDelete}
              deleteIcon={
                chip.color === 'warning' ? <WarningIcon /> : <DoneIcon />
              }
            />
          )}
        </StyledTableFooterCell>
      ))}
    </TableRow>
  </TableFooter>
);
export default EnhancedTableFooter;
