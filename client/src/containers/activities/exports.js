const startErr = 'You must have';
export const FIELDS = [
  { label: 'Activity*', name: 'activity', errmsg: `${startErr} an activity` },
  { label: 'Title*', name: 'title', errmsg: `${startErr} a title` },
  { label: 'URL', name: 'url', helperText: 'http:// or https:// only' },
  { label: 'Date Completed', name: 'dateCompleted' },
];

export const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
  },
  menu: {
    width: 200,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit,
  },
  textField: {
    margin: theme.spacing.unit,
    width: 200,
  },
});
