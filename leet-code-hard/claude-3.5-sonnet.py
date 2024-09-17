class Solution:
    def maxCoins(self, nums: List[int]) -> int:
        # Add boundary balloons
        nums = [1] + nums + [1]
        n = len(nums)
        
        # Initialize DP table
        dp = [[0] * n for _ in range(n)]
        
        # Fill the DP table
        for length in range(2, n):
            for left in range(n - length):
                right = left + length
                for i in range(left + 1, right):
                    coins = nums[left] * nums[i] * nums[right]
                    coins += dp[left][i] + dp[i][right]
                    dp[left][right] = max(dp[left][right], coins)
        
        # Return the maximum coins
        return dp[0][n-1]