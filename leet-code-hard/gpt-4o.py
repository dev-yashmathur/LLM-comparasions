def maxCoins(nums):
    # Add 1 at both ends to handle edge cases
    extended_nums = [1] + nums + [1]
    n = len(nums)
    
    # dp[i][j] will store the max coins that can be obtained
    # by bursting all balloons between i and j (exclusive)
    dp = [[0] * (n + 2) for _ in range(n + 2)]
    
    # Iterate over the possible lengths of the subarrays
    for length in range(2, n + 2):  # length of the interval (i, j)
        for i in range(n + 2 - length):  # start index of the interval
            j = i + length  # end index of the interval
            
            # Find the maximum coins by bursting the last balloon in the range (i, j)
            for k in range(i + 1, j):
                dp[i][j] = max(dp[i][j], 
                               dp[i][k] + dp[k][j] + extended_nums[i] * extended_nums[k] * extended_nums[j])
    
    # The answer is in dp[0][n+1], which considers the range (0, n+1)
    return dp[0][n + 1]
