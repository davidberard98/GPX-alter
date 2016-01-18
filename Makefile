all: reverse.o datapoint.o	
	g++ reverse.o datapoint.o -o reverse

reverse.o: reverse.cpp
	g++ -c reverse.cpp -o reverse.o

datapoint.o: datapoint.cpp
	g++ -c datapoint.cpp -o datapoint.o
