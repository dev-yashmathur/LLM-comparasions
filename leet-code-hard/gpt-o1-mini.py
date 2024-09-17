def maxCoins(nums):
    # Pad the nums array with 1 on both ends
    nums = [1] + nums + [1]
    n = len(nums)
    
    # Initialize DP table
    dp = [[0] * n for _ in range(n)]
    
    # Build the table. 'length' is the distance between left and right.
    for length in range(2, n):
        for left in range(0, n - length):
            right = left + length
            # Iterate through all possible last balloons to burst between left and right
            for i in range(left + 1, right):
                # Coins obtained by bursting the ith balloon last in (left, right)
                coins = nums[left] * nums[i] * nums[right]
                # Total coins = coins from left subarray + coins from right subarray + coins from bursting i
                total = dp[left][i] + coins + dp[i][right]
                # Update the DP table if this is better
                if total > dp[left][right]:
                    dp[left][right] = total
    return dp[0][n-1]

