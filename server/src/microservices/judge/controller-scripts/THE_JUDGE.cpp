#include <iostream>
#include <fstream>
#include <string>

int main(int argc, char* argv[]) {
    if (argc != 2) {
        //std::cerr << "Usage: " << argv[0] << " <input-file>" << std::endl;
        return 4;
    }

    std::ifstream input_file(argv[1]);
    if (!input_file) {
        //std::cerr << "Error: could not open input file " << argv[1] << std::endl;
        return 4;
    }

    std::string line;
    int line_number = 1;
    bool end_of_input = false;
    while (std::getline(input_file, line)) {
        if(std::cin.eof()) {
            //std::cerr << "Wrong answer: user output has less lines than input file" << std::endl;
            return 1;
        }
        std::string user_output;
        std::getline(std::cin, user_output);

        if(input_file.eof()) {
            end_of_input = true;
        }

        if (line != user_output) {
            //std::cerr << "Wrong answer on line " << line_number << std::endl;
            return 1;
        }

        ++line_number;
    }

    if (!end_of_input) {
        //std::cerr << "Wrong answer: user output has more lines than input file" << std::endl;
        return 1;
    }

    return 0;
}
