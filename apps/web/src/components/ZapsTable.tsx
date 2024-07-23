import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

const ZapsTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableCaption>Zaps Dashboard</TableCaption>
        <TableRow>
          <TableHead>Triggers</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Last Edit</TableHead>
          <TableHead>Running</TableHead>
        </TableRow>
      </TableHeader>
    </Table>
  );
};

export default ZapsTable;
