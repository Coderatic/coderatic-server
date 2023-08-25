#include <iostream>
#include <cstdlib>
#include <sys/resource.h>
#include <sys/wait.h>
#include <unistd.h>
#include <fcntl.h>

int main(int argc, char* argv[]) {
    if (argc < 2) {
        std::cerr << "Usage: " << argv[0] << " command" << std::endl;
        return 1;
    }

    const char* command = argv[1];

    pid_t pid = fork();

    if (pid == 0) {
        // Redirect stderr to /dev/null
        int fd = open("/dev/null", O_WRONLY);
        dup2(fd, STDERR_FILENO);
        close(fd);

        int status = system(command);
        exit(status);
    } else if (pid > 0) {
        int childStatus;
        waitpid(pid, &childStatus, 0);

        if (WIFEXITED(childStatus)) {
            struct rusage usage;
            int result = getrusage(RUSAGE_CHILDREN, &usage);

            if (result == 0) {
                long peak_memory_kb = usage.ru_maxrss;
                std::cerr << '\n' << peak_memory_kb << std::endl;
            } else {
                std::cerr << "Failed to get resource usage" << std::endl;
            }
        } else {
            std::cerr << "Child process did not exit normally" << std::endl;
        }
    } else {
        std::cerr << "Fork failed" << std::endl;
    }

    return 0;
}
