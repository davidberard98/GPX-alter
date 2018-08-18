#include <iostream>
#include <string>
#include <vector>
#include <fstream>
#include <sstream>
#include <algorithm>
#include "datapoint.h"

using namespace std;

int abs(int input)
{
	if(input < 0)
		input *= -1;
	return input;
}

vector<string> readfile(string filename)
{
	string line;
	vector<string> output;
	ifstream myfile (filename.c_str());
	if (myfile.is_open())
	{
		while ( getline (myfile,line) )
		{
			output.push_back(line);
		}
		myfile.close();
	}

	return output;
}

void writefile(string filename, string input)
{
	ofstream myfile (filename.c_str());
	if(myfile.is_open())
	{
		myfile << input;
		myfile.close();
	}
}

int main(int argc, char *argv[] )
{
	if(argc < 5)
	{
		cout << "USAGE:" << endl;
		cout << "  ./reverse [inputfile] [outputfile] [y/n reverse] [offset (seconds)]\n  eg. ./reverse infile.gpx outfile.gpx n 3600\n" << endl;
		cout << "  Input file should be ONLY the relevant parts of the gpx... the 4-line parts." << endl;
		cout << "  If reversing a gpx with A(4:00)->B(4:01)->C(4:02), then C(4:02)->B(4:03)->A(4:04) will be used for the reversed activity. \n" << endl;
	}
	
	else
	{
		string infilename = argv[1];
		string outfilename = argv[2];
		string yn = argv[3];
		string soffset = argv[4];
		int offset = 0;
		stringstream convert;
		convert.str(soffset);
		convert >> offset;
		bool doReverse = false;
		if(yn.at(0) == 'y' || yn.at(0) == 'Y')
			doReverse = true;
		// order details
		cout << "    Input from\t: " << infilename << endl;
		cout << "    Output to\t: " << outfilename << endl;
		if(doReverse)
			cout << "    reverse\t: YES" << endl;
		else
			cout << "    reverse\t: NO" << endl;
		cout << "    Offset of\t: " << offset << " seconds" << endl;

		cout << "\nAre you sure you want to progress? (y/n): " << endl;
		string response;
		cin >> response;
		if(response != "Y" && response != "y")
			return 0;
		
	
		vector<datapoint> datapoints;
		vector<string> lines = readfile(infilename);

		for(int i=0;i<lines.size()/9;++i)
		{
			string combined = lines[i*9] + "\n"; 
			combined += lines[i*9+1] + "\n"; 
			combined += lines[i*9+2] + "\n"; 
			combined += lines[i*9+8];
			datapoints.push_back(datapoint(combined));
//			cout << datapoints[i].writeTime() << endl;
		}
		if(doReverse)
		{
			reverse(datapoints.begin(), datapoints.end()); // a c++ built-in function apparently
		}
		
		// to understand, read the for loop below.
		int differenceFromPrevious = abs(datapoints[0].time - datapoints[1].time);
		int previousTime = datapoints[0].time + offset;
		datapoints[0].time = previousTime;

		string alteredGPX = datapoints[0].write() + "\n";

		for(int i=1;i<datapoints.size()-1;++i)
		{
			// calculate the time that this datapoint should have.  The new datapoints[i-1] is previousTime
			// and the old abs(datapoints[i-1] - datapoints[i]) difference is "differenceFromPrevious".
			int thistime = previousTime + differenceFromPrevious;
			// Now, before we reset datapoints[i].time, record the difference between datapoints[i].time
			// and datapoints[i+1].time, for use in the next iteration.
			differenceFromPrevious = abs(datapoints[i].time - datapoints[i+1].time);
			// Now, set datapoints[i].time = (new adjusted time)
			datapoints[i].time = thistime;
			// write the new datapoint to file
			alteredGPX += datapoints[i].write() + "\n";
			// set the "previousTime" to this value, for next iteration.
			previousTime = thistime;
		}
		datapoints[datapoints.size()-1].time = previousTime + differenceFromPrevious;
		alteredGPX += datapoints[datapoints.size()-1].write() + "\n";
		writefile(outfilename, alteredGPX);
	}


	return 0;
}
