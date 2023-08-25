#!/bin/bash

problem="$1"
exec="$2"
lang="$3"
in_file_name="$4"
out_file_name="$5"

test_sets="../cache/test_sets"

in_file="$test_sets"/"$problem"/input/"$in_file_name"
out_file="$test_sets"/"$problem"/output/"$out_file_name"

mem_limit="$6"
time_limit="$7"

CHECKER_PATH="$8"

STACK_SIZE=268435456 #256 MB

user_out_file=$(mktemp)

case "$lang" in
cpp | c | rs)
	start_time=$(date +%s%N)
	ulimit -t "$time_limit" -v "$mem_limit" -s $STACK_SIZE
	memory=$({ /usr/bin/time -f " %M" aa-exec -p bin_jail ../cache/code/"$exec" < "$in_file" 2>&1 1> "$user_out_file"; } 2>&1 )
	program_exit_code=$?
	end_time=$(date +%s%N)

	# Judging
	checker_output="{}"
	script_verdict="{}"
	if [ $program_exit_code == 0 ]; then
    	checker_output=$("$CHECKER_PATH" "$user_out_file" "$out_file")
    	checker_exit_code=$?
	else
    	checker_exit_code=0
    	case "$program_exit_code" in
    	137)
			script_verdict="
			{
				\"verdict\": \"Time Limit Exceeded\",
				\"message\": \"Your program exceeded the ${time_limit}s run-time limit\"
			}"
			;;
		139)
			script_verdict="
			{
				\"verdict\": \"Memory Limit Exceeded\",
				\"message\": \"Your program exceeded the $mem_limit KB of run-time memory limit\"
			}"
			;;
		*)
			script_verdict="
			{
				\"verdict\": \"Run-time Error\",
				\"message\": \"Your program crashed with an exit code of: $program_exit_code\"
			}"
		esac

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
json_data=$(jq -C -n \
            --arg program_exit_code "$program_exit_code" \
            --arg checker_exit_code "$checker_exit_code" \
            --arg memory "$memory" \
            --arg time "$time" \
            --argjson checker_output "$checker_output" \
            --argjson script_verdict "$script_verdict" \
            '{program_exit_code: $program_exit_code, checker_exit_code: $checker_exit_code, memory: $memory, cpu_time: $time, script_verdict: $script_verdict, checker_output: $checker_output}')
echo "$json_data"
exit 0
