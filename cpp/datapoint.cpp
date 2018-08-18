#include "datapoint.h"

datapoint::datapoint() {time = 0;}
datapoint::datapoint(std::string input)
{
	parse(input);
}

void datapoint::parse(std::string input)
{
	int timeloc = input.find("<time>");
	int endtimeloc = input.find("</time>");
	before = input.substr(0, timeloc+6);
	after = input.substr(endtimeloc, input.length()-endtimeloc);
	std::string timedatestr = input.substr(timeloc+6, endtimeloc-timeloc-6);
	parseTime(timedatestr);
}

void datapoint::parseTime(std::string timedatestr)
{
	int tloc = timedatestr.find("T");
	std::string datestr = timedatestr.substr(0, tloc);
	std::string timestr = timedatestr.substr(tloc+1, timedatestr.length()-tloc-2);

	bool leapyear = false;
	int dateparts[3] = {1,2,3};
	int timeparts[3];

	std::stringstream convert;
	convert.clear();
	convert.str(datestr.substr(0,4));
	convert >> dateparts[0];
	convert.clear();
	convert.str(datestr.substr(5,2));
	convert >> dateparts[1];
	convert.clear();
	convert.str(datestr.substr(8,2));
	convert >> dateparts[2];

	convert.clear();
	convert.str(timestr.substr(0,2));
	convert >> timeparts[0];
	convert.clear();
	convert.str(timestr.substr(3,2));
	convert >> timeparts[1];
	convert.clear();
	convert.str(timestr.substr(6,2));
	convert >> timeparts[2];

	year = dateparts[0];

	int *monthoffsets = datapoint::getMonthOffsets(year);
	int daystotal = dateparts[2] + monthoffsets[dateparts[1]];
	free(monthoffsets);
	int extratime = timeparts[0]*60*60+timeparts[1]*60+timeparts[2];

	time = daystotal*24*60*60+extratime;
}

std::string datapoint::writeTime()
{
	std::string output, intermediate;
	std::stringstream convert;

	convert.clear();
	convert << year;
	intermediate = convert.str();
	output += intermediate;

	int datenum = time/(3600*24);
	int timenum = time%(3600*24);

	int *monthoffsets = datapoint::getMonthOffsets(year);
	int monthnumber = 0;
	for(int i=1;i<=12;++i)
	{
		if(monthoffsets[i] < datenum)
			monthnumber = i;
		else
			break;
	}
	int daynumber = datenum - monthoffsets[monthnumber];
	
	//month
	output += "-" + twodigits(monthnumber, convert);

	//day
	output += "-" + twodigits(daynumber, convert);

	//'T'
	output += "T";

	// parse time into h, m, s
	int h, m, s;
	h = timenum/3600;
	m = (timenum/60)%60;
	s = timenum%60;

	//hours
	output += twodigits(h, convert);
	//minutes
	output += ":" + twodigits(m, convert);
	//seconds
	output += ":" + twodigits(s, convert);
	
	output += "Z";
	return output;
}

std::string datapoint::write()
{
	std::string output = before;
	output += writeTime();
	output += after;
	return output;
}

std::string datapoint::twodigits(int input, std::stringstream& convert)
{
	convert.clear();
	convert.str("");
	std::string intermediate;
	convert << input;
	intermediate = convert.str();
	intermediate = minLength(intermediate, 2);
	return intermediate;
}

std::string datapoint::minLength(std::string in, int length)
{
	while(in.length() < length)
		in = "0" + in;
	return in;
}

int* datapoint::getMonthOffsets(int yrnum)
{
			//    1  2   3   4    5  6    7  8   9   10  11  12
	int lengths[] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

	if(yrnum%4 == 0 && yrnum%100 != 0)
		++lengths[2];

//	int output[13];
	int *output = (int *) malloc (sizeof (int) * 13);
	output[0] = 0;
	output[1] = 0;
	for(int i=2;i<=12;++i)
	{
		output[i] = output[i-1] + lengths[i-1];
	}

	return output;
}
