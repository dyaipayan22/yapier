import { useState, useEffect } from 'react';
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
import { axiosPrivate } from '@/lib/axios';
import { Switch } from './ui/switch';

const zaps = [
  {
    triggers: ['a', 'b'],
    name: 'trigger',
    lastEdit: '2d',
    running: true,
  },
  {
    triggers: ['a', 'b'],
    name: 'trigger 2',
    lastEdit: '3d',
    running: false,
  },
];

const ZapsTable = () => {
  // const [zaps, setZaps] = useState();

  // async function fetchZaps() {
  //   await axiosPrivate.get('/api/v1/zap').then((res) => {
  //     console.log(res);
  //     setZaps(res.data);
  //   });
  // }
  // useEffect(() => {
  //   fetchZaps();
  // }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Triggers</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Last Edit</TableHead>
          <TableHead>Running</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {zaps?.map((zap, index) => (
          <TableRow key={index}>
            <TableCell>{zap.triggers}</TableCell>
            <TableCell>{zap.name}</TableCell>
            <TableCell>{zap.lastEdit}</TableCell>
            <TableCell>
              <Switch checked={zap.running} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ZapsTable;
