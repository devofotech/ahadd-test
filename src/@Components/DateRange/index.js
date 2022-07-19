import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';

export default function DateRange({ selectionRange, setSelectionRange }) {
  const handleSelect = ({ selection }) => {
    setSelectionRange(selection);
  };

  return (
    <DateRangePicker
      ranges={[{ ...selectionRange, key: 'selection', color: 'var(--primary-color)' }]}
      onChange={handleSelect}
      maxDate={new Date()}
      staticRanges={[]}
      inputRanges={[]}
    />
  );
}
