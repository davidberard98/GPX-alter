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
	if(argc < 4)
	{
		cout << "USAGE:" << endl;
		cout << "  ./squish [inputfile] [outputfile] [Squeeze factor eg. 0.5]\n  eg. ./squish infile.gpx outfile.gpx 0.5\n" << endl;
		cout << "  Input file should be ONLY the relevant parts of the gpx... the 4-line parts." << endl;
	}
	
	else
	{
		string infilename = argv[1];
		string outfilename = argv[2];
		string sfactor = argv[3];
		double factor = 0.0;
		stringstream convert;
		convert.str(sfactor);
		convert >> factor;
		// order details
		cout << "    Input from\t: " << infilename << endl;
		cout << "    Output to\t: " << outfilename << endl;

		cout << "    In " << factor << " of the time" << endl;

		cout << "\nAre you sure you want to progress? (y/n): " << endl;
		string response;
		cin >> response;
		if(response != "Y" && response != "y")
			return 0;
		
		vector<datapoint> datapoints;
		vector<string> lines = readfile(infilename);

		for(int i=0;i<lines.size()/4;++i)
		{
			cout << i << endl;
			string combined = lines[i*4] + "\n"; 
			combined += lines[i*4+1] + "\n"; 
			combined += lines[i*4+2] + "\n"; 
			combined += lines[i*4+3];
			datapoints.push_back(datapoint(combined));
//			cout << datapoints[i].writeTime() << endl;
		}

		
		// to understand, read the for loop below.
		int firstTime = datapoints[0].time;
		int diffFromFirst = 0;

		string alteredGPX = datapoints[0].write() + "\n";

		for(int i=1;i<datapoints.size();++i)
		{
			cout << i << endl;
			// and the old abs(datapoints[i-1] - datapoints[i]) difference is "differenceFromPrevious".
			diffFromFirst = datapoints[i].time - firstTime;
			int thistime = (int) ((double) diffFromFirst)*factor + firstTime;

			datapoints[i].time = thistime;

			alteredGPX += datapoints[i].write() + "\n";
			// set the "previousTime" to this value, for next iteration.
		}
		writefile(outfilename, alteredGPX);
	}


	return 0;
}
