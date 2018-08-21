all: reverse squish

reverse: reverse.o datapoint.o
	g++ reverse.o datapoint.o -o reverse

squish: squish.o datapoint.o
	g++ squish.o datapoint.o -o squish

reverse.o: reverse.cpp
	g++ -c reverse.cpp -o reverse.o

datapoint.o: datapoint.cpp
	g++ -c datapoint.cpp -o datapoint.o

squish.o: squish.cpp
	g++ -c squish.cpp -o squish.o

clean:
	rm -rf *.o squish reverse
