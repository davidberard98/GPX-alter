#GPX Altering Files

#Use
Mainly for altering GPX exported by strava.  Remove the inital stuff and only leave the actual datapoints you want to be altered:

```
   ...
   <trkpt lat="23.4567890" lon="-98.7654321">
    <ele>100</ele>
    <time>2016-01-11T16:52:02Z</time>
   </trkpt>
   <trkpt lat="23.4567894" lon="-98.7654325">
    <ele>100</ele>
    <time>2016-01-11T16:52:05Z</time>
   </trkpt>
   ...
```

To run type
```
./reverse [inputfile] [outputfile] [y/n to reverse data] [offset in seconds]
```

#Compiling

Just "make"
