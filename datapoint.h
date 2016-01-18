#ifndef DBB_DATAPOINT_GPX_ALTERING_THING
#define DBB_DATAPOINT_GPX_ALTERING_THING

#include <string>
#include <sstream>
#include <iostream>
#include <stdlib.h>

class datapoint {
public:

std::string before;
std::string after;
int time; // seconds since jan 1 of THE DESIGNATED YEAR
int year;

datapoint();
datapoint(std::string);

void parse(std::string);
void parseTime(std::string);
std::string writeTime();
std::string write();
static int* getMonthOffsets(int);
static std::string minLength(std::string, int);
static std::string twodigits(int, std::stringstream&);


};


#endif
