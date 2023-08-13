#!/bin/bash

problem="$1"
exec="$2"
lang="$3"
in_file_name="$4"
out_file_name="$5"

test_sets="../cache/test_sets"

in_file="$test_sets"/"$problem"/input/"$in_file_name"
out_file="$test_sets"/"$problem"/output/"$out_file_name"

CHECKER_PATH="./THE_JUDGE.out"

mem_limit="$6"
time_limit="$7"

STACK_SIZE=268435456 #256 MB

user_out_file=$(mktemp)

case "$lang" in
cpp | c | rs)
	start_time=$(date +%s%N)
	ulimit -t "$time_limit" -v "$mem_limit" -s $STACK_SIZE
	memory=$( { /usr/bin/time -f " %M" aa-exec -p bin_jail ../cache/code/"$exec" < "$in_file" 2>&1 1> "$user_out_file"; } 2>&1 )
	program_exit_code=$?
	end_time=$(date +%s%N)

	# Judging
	checker_output="{}"
	if [ $program_exit_code == 0 ]; then
    	checker_output=$("$CHECKER_PATH" "$user_out_file" "$out_file")
    	checker_exit_code=$?
	else
    	checker_exit_code=1
	fi
	# pipe_exit_codes=("${PIPESTATUS[@]}")
	;;
*)
	echo "Language not supported"
	exit 255
	;;
esac

time=$((($end_time - $start_time)/1000000))
memory=$(echo "$memory" | awk -v RS='[ \n]' 'NF{word=$0} END{print word}')

rm "$user_out_file"

# Create a JSON object with the variables
json_data=$(jq -n \
            --arg program_exit_code "$program_exit_code" \
            --arg checker_exit_code "$checker_exit_code" \
            --arg memory "$memory" \
            --arg time "$time" \
            --argjson checker_output "$checker_output" \
            '{program_exit_code: $program_exit_code, checker_exit_code: $checker_exit_code, memory: $memory, cpu_time: $time, checker_output: $checker_output}')
echo "$json_data"
exit 0
