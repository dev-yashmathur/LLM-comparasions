def maxCoins(nums):
    """
    Returns the maximum coins that can be collected by bursting the balloons wisely.

    Args:
        nums (list): A list of integers representing the numbers on the balloons.

    Returns:
        int: The maximum coins that can be collected.
    """
    # Add 1 at the beginning and end of the list to handle out of bounds cases
    nums = [1] + nums + [1]
    n = len(nums)
    
    # Create a 2D array to store the maximum coins for each subproblem
    dp = [[0] * n for _ in range(n)]
    
    # Iterate over the length of the subproblems
    for length in range(1, n - 1):
        # Iterate over the start index of the subproblems
        for left in range(n - length - 1):
            # Calculate the end index of the subproblem
            right = left + length + 1
            # Iterate over the balloons in the subproblem
            for i in range(left + 1, right):
                # Calculate the coins for bursting the current balloon
                coins = nums[left] * nums[i] * nums[right]
                # Update the maximum coins for the subproblem
                dp[left][right] = max(dp[left][right], coins + dp[left][i] + dp[i][right])
    
    # Return the maximum coins for the entire problem
    return dp[0][n - 1]

