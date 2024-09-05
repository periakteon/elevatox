import { Skeleton } from "@/components/ui/skeleton";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";

export default function TableFallback() {
  return (
    <div className="p-4">
      <div className="flex flex-wrap">
        <Skeleton className="my-4 h-4 w-[200px]" />
        <Skeleton className="my-4 ml-0 hidden h-4 w-[200px] sm:ml-4 sm:block" />
      </div>
      <div className="flex flex-wrap">
        <Skeleton className="my-4 h-4 w-[200px]" />
        <Skeleton className="my-4 ml-0 hidden h-4 w-[200px] sm:ml-4 sm:block" />
        <Skeleton className="my-4 ml-0 hidden h-4 w-[200px] sm:ml-4 sm:block" />
        {/* // to the most right */}
        <Skeleton className="my-4 ml-auto h-4 w-[100px] sm:w-[200px]" />
      </div>
      <Card className="mt-4 overflow-x-hidden rounded-lg p-0">
        <CardHeader className="pb-4">
          <Skeleton className="h-4 w-[200px]" />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">
                  <Skeleton className="h-4 w-[80px]" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-[120px]" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-[100px]" />
                </TableHead>
                <TableHead className="text-right">
                  <Skeleton className="h-4 w-[80px]" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  <Skeleton className="h-4 w-[80px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[120px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[100px]" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-4 w-[80px]" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <Skeleton className="h-4 w-[80px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[120px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[100px]" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-4 w-[80px]" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <Skeleton className="h-4 w-[80px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[120px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[100px]" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-4 w-[80px]" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="flex flex-row-reverse">
        <Skeleton className="my-4 ml-4 h-4 w-[100px]" />
        <Skeleton className="my-4 ml-4 h-4 w-[100px]" />
        <Skeleton className="my-4 ml-4 h-4 w-[100px]" />
      </div>
    </div>
  );
}
