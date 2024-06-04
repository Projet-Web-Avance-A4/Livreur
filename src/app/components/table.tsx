import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Tooltip,
} from '@nextui-org/react';
import {
  FaChevronDown,
  FaMagnifyingGlass,
  FaCheck,
} from 'react-icons/fa6';
import { columns, commandes, paymentOptions } from '../api/temp.data';
import { capitalize } from '../utils/capitalize';

const INITIAL_VISIBLE_COLUMNS = [
  'adresse_resto',
  'adresse_client',
  'payment_method',
  'actions',
];

type Commande = (typeof commandes)[0];

export default function App() {
  const [filterValue, setFilterValue] = React.useState('');
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [paymentFilter, setpaymentFilter] = React.useState<Selection>('all');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'age',
    direction: 'ascending',
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredOrders = [...commandes];

    if (hasSearchFilter) {
      filteredOrders = filteredOrders.filter((commande) =>
          commande.ville_client!.toLowerCase().includes(filterValue.toLowerCase()) ||
          commande.ville_resto!.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      paymentFilter !== 'all' &&
      Array.from(paymentFilter).length !== paymentOptions.length
    ) {
      filteredOrders = filteredOrders.filter((commande) =>
        Array.from(paymentFilter).includes(commande.payment_method)
      );
    }
    return filteredOrders;
  }, [commandes, filterValue, paymentFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Commande, b: Commande) => {
      const first = a[sortDescriptor.column as keyof Commande] as number;
      const second = b[sortDescriptor.column as keyof Commande] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);
  
  const pages = Math.ceil(Math.min(filteredItems.length, commandes.length) / rowsPerPage);

  const renderCell = React.useCallback(
    (commande: Commande, columnKey: React.Key) => {
      const cellValue = commande[columnKey as keyof Commande];

      switch (columnKey) {
        case 'adresse_resto':
          return (
            <div>
              <p className='text-black'>
                {commande.adresse_resto}, {commande.ville_resto}
              </p>
            </div>
          );
        case 'adresse_client':
          return (
            <div>
              <p className='text-black'>
                {commande.adresse_client}, {commande.ville_client}
              </p>
            </div>
          );
        case 'payment_method':
          return (
            <div>
              <p className='text-black'>{commande.payment_method}</p>
            </div>
          );
        case 'actions':
          return (
            <div className='relative flex justify-end items-center gap-2'>
              <Tooltip className='text-black' content='Valider'>
                <Button isIconOnly radius='full' size='sm' variant='light'>
                  <FaCheck className='text-default-400 fill-green-500' />
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between gap-3 items-end'>
          <Input
            isClearable
            classNames={{
              base: 'w-full sm:max-w-[44%]',
              inputWrapper: 'border-1 text-black',
            }}
            placeholder='Chercher par villes...'
            size='sm'
            startContent={<FaMagnifyingGlass className='text-default-300' />}
            value={filterValue}
            variant='bordered'
            onClear={() => setFilterValue('')}
            onValueChange={onSearchChange}
          />
          <div className='flex gap-3'>
            <Dropdown>
              <DropdownTrigger className='hidden sm:flex'>
                <Button
                  endContent={<FaChevronDown className='text-small' />}
                  size='sm'
                  variant='flat'
                >
                  Moyen de Paiement
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label='Table Columns'
                closeOnSelect={false}
                selectedKeys={paymentFilter}
                selectionMode='multiple'
                onSelectionChange={setpaymentFilter}
              >
                {paymentOptions.map((paiement: any) => (
                  <DropdownItem
                    key={paiement.uid}
                    className='capitalize text-black'
                  >
                    {capitalize(paiement.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-default-400 text-small'>
            Total {Math.min(filteredItems.length, commandes.length)} commande(s)
          </span>
          <label className='flex items-center text-default-400 text-small'>
            Ligne(s) par page :
            <select
              className='bg-transparent outline-none text-default-400 text-small'
              onChange={onRowsPerPageChange}
            >
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    paymentFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    commandes.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className='py-2 px-2 flex justify-between items-center'>
        <Pagination
          showControls
          classNames={{
            cursor: 'bg-foreground text-background',
          }}
          color='default'
          // isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant='light'
          onChange={setPage}
        />
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ['max-h-[382px]', 'max-w-3xl'],
      th: ['bg-transparent', 'text-default-500', 'border-b', 'border-divider'],
      td: [
        // changing the rows border radius
        // first
        'group-data-[first=true]:first:before:rounded-none',
        'group-data-[first=true]:last:before:rounded-none',
        // middle
        'group-data-[middle=true]:before:rounded-none',
        // last
        'group-data-[last=true]:first:before:rounded-none',
        'group-data-[last=true]:last:before:rounded-none',
      ],
    }),
    []
  );

  return (
    <Table
      isCompact
      removeWrapper
      bottomContent={bottomContent}
      bottomContentPlacement='outside'
      // checkboxesProps={{
      //     classNames: {
      //         wrapper: 'after:bg-foreground after:text-background text-background',
      //     },
      // }}
      classNames={classNames}
      selectedKeys={selectedKeys}
      selectionMode='none'
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement='outside'
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No orders found'} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
