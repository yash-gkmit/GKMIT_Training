Query No. 1-

->To get the max of Milliseconds-

Select
 max("Milliseconds") --this is a max aggregate function which is used to calculate maximum among all the values present in the column. 
from 
  "Track";

->To get the min of Bytes-

Select
 min("Bytes") --this is a min aggregate function which is used to calculate minimum among all the values present in the column. 
from 
  "Track";

->To get the max of milliseconds-

Select
 sum("UnitPrice") --this is a sum aggregate function which is used to calculate sum of all the values present in the column. 
from 
  "Track";    


Query No. 2-

-> To convert the milliseconds into seconds, bytes into kilobytes and output should be new column having value of kliobytes/second.

--here we first calculate kilobytes and then seconds and with the help of both that we generate kb/sec column.

Select
 concat(("Bytes"/ 1024) / ("Milliseconds"/1000), ' ', 'KB/sec') 
As
  "kilo_byte_per_second"
from
  "Track"

Query No. 3 -

-> Calculate the count of the people by their city and sort them alphabatically from employee table.

Select
 "City", --this will select city 
COUNT("FirstName") AS total_count --this will count the  total people i9n the city and return it in a total_count column.
from
 "Employee"
GROUP BY --it will group all distinct city together and 
 "City"
ORDER BY --order by arrange them in asecending order
 "City";  

 Query No. 4 -

 -> count the number of invoice from jan to march of 2009 using the invoice date column and also show the sum of total in another column of all the invoice on that range from invoice table.

 Select
  Count(*) --for counting total number of invoice satisfy conditions.
AS
 invoice_count, --and column name is represent as invoice_count
sum("Total") --for calculating the sum of total staisfy the below condition.
AS
 total_sum --sum of totalk come in a column name total_sum
from 
 "Invoice"
where --to check the condition
 "InvoiceDate" 
Between  --for the condition ranging between jan to march.
 '2009-01-01' AND '2009-03-31';




